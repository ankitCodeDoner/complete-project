// ─────────────────────────────────────────────────────────────
// MedVance admin API.
//
// A small dependency-free Node server that exposes the website's JSON
// data (surgical/src/data) as REST resources for the admin panel.
// Responses use the `{ data }` envelope the admin's RTK Query slices
// already expect.
//
//   npm run api        (from admin-setup-template/)
// ─────────────────────────────────────────────────────────────

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { config } from "./config.mjs";
import { collections, documents, orders } from "./resources.mjs";
import { HttpError, buildRecord, slugify } from "./schema.mjs";
import { publicFile, readJson, writeJson } from "./store.mjs";

// ── Auth (HS256 JWT, decoded client-side by jwt-decode) ──────

const b64url = (input) => Buffer.from(input).toString("base64url");
const sign = (data) => crypto.createHmac("sha256", config.jwtSecret).update(data).digest("base64url");

function issueToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      Id: "1",
      Name: config.admin.name,
      Email: config.admin.email,
      Role: "Admin",
      iat: now,
      exp: now + config.tokenTtlSeconds,
    })
  );
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

function verifyToken(authHeader) {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) return false;
  const expected = Buffer.from(sign(`${header}.${payload}`));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

const sameSecret = (a, b) => {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

// ── Data access ──────────────────────────────────────────────

function readSet(def) {
  const json = readJson(def.file);
  return def.path ? json[def.path] : json;
}

function writeSet(def, value) {
  if (!def.path) return writeJson(def.file, value);
  const json = readJson(def.file);
  json[def.path] = value;
  writeJson(def.file, json);
}

function findIndex(list, id) {
  const index = list.findIndex((item) => String(item.id) === String(id));
  if (index === -1) throw new HttpError(404, "Record not found");
  return index;
}

function nextId(def, list) {
  if (def.idPrefix) {
    const max = Math.max(0, ...list.map((i) => Number(String(i.id).slice(def.idPrefix.length)) || 0));
    return `${def.idPrefix}${max + 1}`;
  }
  return Math.max(0, ...list.map((i) => Number(i.id) || 0)) + 1;
}

async function saveUploads(record, uploads) {
  for (const { key, file, ext } of uploads) {
    const base = slugify(path.parse(file.name || "image").name).slice(0, 40) || "image";
    const name = `${Date.now()}-${base}.${ext}`;
    const dir = path.join(config.publicDir, config.uploadDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    record[key] = `/${config.uploadDir}/${name}`;
  }
}

/** Products referencing a category/brand slug. */
function referencesTo(def, slug) {
  if (!def.references) return [];
  const target = collections[def.references.collection];
  return readSet(target).filter((item) => item[def.references.key] === slug);
}

/** Keep products/orders pointing at a category, brand or product after its slug changes. */
function cascadeSlug(name, def, oldSlug, newSlug) {
  if (!oldSlug || oldSlug === newSlug) return;
  if (def.references) {
    const target = collections[def.references.collection];
    const key = def.references.key;
    writeSet(
      target,
      readSet(target).map((item) => (item[key] === oldSlug ? { ...item, [key]: newSlug } : item))
    );
  }
  if (name === "product") {
    writeSet(
      orders,
      readSet(orders).map((order) => ({
        ...order,
        items: order.items.map((item) => (item.slug === oldSlug ? { ...item, slug: newSlug } : item)),
      }))
    );
  }
}

function checkCollectionRules(def, record, list) {
  if ("slug" in record && list.some((i) => i.slug === record.slug && String(i.id) !== String(record.id)))
    throw new HttpError(409, `Another ${def.label.toLowerCase()} already uses the slug "${record.slug}"`);
  for (const rel of def.belongsTo ?? []) {
    const exists = readSet(collections[rel.collection]).some((i) => i.slug === record[rel.key]);
    if (!exists) throw new HttpError(400, `Unknown ${rel.collection}: ${record[rel.key]}`);
  }
  const problem = def.check?.(record);
  if (problem) throw new HttpError(400, problem);
}

// ── Handlers ─────────────────────────────────────────────────

const collectionHandlers = (name, def) => ({
  list: () => readSet(def),

  get: ({ id }) => {
    const list = readSet(def);
    return list[findIndex(list, id)];
  },

  create: async ({ body }) => {
    const list = readSet(def);
    const { record, uploads } = buildRecord(def.fields, body, { id: nextId(def, list) });
    checkCollectionRules(def, record, list);
    await saveUploads(record, uploads);
    writeSet(def, def.prepend ? [record, ...list] : [...list, record]);
    return { data: record, message: `${def.label} created` };
  },

  update: async ({ id, body }) => {
    const list = readSet(def);
    const index = findIndex(list, id);
    const existing = list[index];
    const { record, uploads } = buildRecord(def.fields, body, existing);
    checkCollectionRules(def, record, list);
    await saveUploads(record, uploads);
    list[index] = record;
    writeSet(def, list);
    cascadeSlug(name, def, existing.slug, record.slug);
    return { data: record, message: `${def.label} updated` };
  },

  remove: ({ id }) => {
    const list = readSet(def);
    const index = findIndex(list, id);
    const used = referencesTo(def, list[index].slug);
    if (used.length)
      throw new HttpError(
        409,
        `Cannot delete: ${used.length} product${used.length === 1 ? "" : "s"} still use this ${def.label.toLowerCase()}. Reassign them first.`
      );
    list.splice(index, 1);
    writeSet(def, list);
    return { data: null, message: `${def.label} deleted` };
  },

  reorder: ({ body }) => {
    const list = readSet(def);
    const ids = Array.isArray(body.ids) ? body.ids.map(String) : [];
    if (ids.length !== list.length || !list.every((i) => ids.includes(String(i.id))))
      throw new HttpError(400, "Reorder must include every record exactly once");
    const byId = new Map(list.map((i) => [String(i.id), i]));
    writeSet(def, ids.map((id) => byId.get(id)));
    return { data: null, message: "Order saved" };
  },
});

const orderTotal = (order) => order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

function dashboard() {
  const products = readSet(collections.product);
  const allOrders = readSet(orders);
  const profile = readSet(documents.customer);
  return {
    counts: {
      products: products.length,
      outOfStock: products.filter((p) => !p.inStock).length,
      categories: readSet(collections.category).length,
      brands: readSet(collections.brand).length,
      blogPosts: readSet(collections.blog).length,
      orders: allOrders.length,
      openOrders: allOrders.filter((o) => o.status !== "Delivered").length,
      unreadNotifications: readSet(collections.notification).filter((n) => !n.read).length,
    },
    recentOrders: [...allOrders]
      .sort((a, b) => b.placedOn.localeCompare(a.placedOn))
      .slice(0, 5)
      .map((o) => ({
        id: o.id,
        placedOn: o.placedOn,
        status: o.status,
        payment: o.payment,
        items: o.items.length,
        total: orderTotal(o),
        business: profile.business,
      })),
  };
}

// ── Routing ──────────────────────────────────────────────────

const routes = [];
const route = (method, pattern, handler) => {
  const keys = [];
  const regex = new RegExp(
    "^/api" + pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), "([^/]+)")) + "/?$"
  );
  routes.push({ method, regex, keys, handler });
};

route("POST", "/user/login", ({ body }) => {
  const okEmail = sameSecret(String(body.code ?? "").toLowerCase(), config.admin.email.toLowerCase());
  const okPassword = sameSecret(body.password ?? "", config.admin.password);
  if (!(okEmail && okPassword)) throw new HttpError(401, "Invalid email or password");
  return { token: issueToken(), data: { name: config.admin.name, email: config.admin.email } };
});

// The admin's useUserRole hook loads the signed-in user's roles on startup.
// There is a single admin; the panel's claims come from Router.tsx.
route("GET", "/user/role", () => [{ id: 1, name: "Admin", roleMenus: [] }]);

route("GET", "/dashboard", dashboard);

for (const [name, def] of Object.entries(collections)) {
  const h = collectionHandlers(name, def);
  route("GET", `/${name}`, h.list);
  route("POST", `/${name}`, h.create);
  route("PUT", `/${name}/reorder`, h.reorder);
  route("GET", `/${name}/:id`, h.get);
  route("PUT", `/${name}/:id`, h.update);
  route("DELETE", `/${name}/:id`, h.remove);
}

route("GET", "/order", () =>
  readSet(orders).map((o) => ({ ...o, total: orderTotal(o) }))
);
route("GET", "/order/:id", ({ id }) => {
  const list = readSet(orders);
  const order = list[findIndex(list, id)];
  const address = readJson("account.json").addresses.find((a) => a.id === order.addressId) ?? null;
  return { ...order, total: orderTotal(order), address };
});
route("PUT", "/order/:id", ({ id, body }) => {
  const list = readSet(orders);
  const index = findIndex(list, id);
  const { record } = buildRecord(orders.fields, body, list[index]);
  list[index] = record;
  writeSet(orders, list);
  return { data: record, message: "Order updated" };
});

route("GET", "/customer/address", () => readJson("account.json").addresses);

const documentRoutes = { company: "/company", contact: "/contact", customer: "/customer/profile" };
for (const [name, def] of Object.entries(documents)) {
  route("GET", documentRoutes[name], () => readSet(def));
  route("PUT", documentRoutes[name], async ({ body }) => {
    const { record, uploads } = buildRecord(def.fields, body, readSet(def));
    await saveUploads(record, uploads);
    writeSet(def, record);
    return { data: record, message: `${def.label} saved` };
  });
}

// ── HTTP plumbing ────────────────────────────────────────────

const MIME = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon",
};

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > config.maxUploadBytes * 3) throw new HttpError(413, "Request is too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks);
  const type = req.headers["content-type"] || "";
  if (!raw.length) return {};
  if (type.includes("application/json")) {
    try {
      return JSON.parse(raw.toString("utf8"));
    } catch {
      throw new HttpError(400, "Malformed JSON body");
    }
  }
  if (type.includes("multipart/form-data")) {
    const form = await new Request("http://local/", {
      method: "POST",
      headers: { "content-type": type },
      body: raw,
    }).formData();
    return Object.fromEntries(form.entries());
  }
  throw new HttpError(415, "Send JSON or multipart/form-data");
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

const fail = (res, status, message) =>
  send(res, status, { succeeded: false, message, messages: [message] });

function serveAsset(res, urlPath) {
  const file = publicFile(urlPath);
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) return fail(res, 404, "Not found");
  res.writeHead(200, {
    "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", config.corsOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  const { pathname } = new URL(req.url, "http://local");
  const started = Date.now();
  res.on("finish", () =>
    console.log(`${req.method} ${pathname} ${res.statusCode} ${Date.now() - started}ms`)
  );

  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.method === "GET" && pathname.startsWith("/assets/")) return serveAsset(res, pathname);

  const match = routes
    .filter((r) => r.method === req.method)
    .map((r) => ({ r, m: r.regex.exec(pathname) }))
    .find(({ m }) => m);
  if (!match) return fail(res, 404, `No route for ${req.method} ${pathname}`);

  const isLogin = pathname.replace(/\/$/, "") === "/api/user/login";
  if (!isLogin && !verifyToken(req.headers.authorization)) return fail(res, 401, "Please sign in again");

  try {
    const params = Object.fromEntries(match.r.keys.map((k, i) => [k, decodeURIComponent(match.m[i + 1])]));
    const body = req.method === "POST" || req.method === "PUT" ? await readBody(req) : {};
    const result = await match.r.handler({ ...params, body });
    const envelope = result && typeof result === "object" && ("data" in result || "token" in result)
      ? result
      : { data: result };
    send(res, 200, { succeeded: true, ...envelope });
  } catch (error) {
    if (error instanceof HttpError) return fail(res, error.status, error.message);
    console.error(error);
    fail(res, 500, "Something went wrong on the server");
  }
});

server.listen(config.port, () => {
  console.log(`MedVance admin API on http://localhost:${config.port}/api`);
  console.log(`  data:   ${config.dataDir}`);
  console.log(`  public: ${config.publicDir}`);
});
