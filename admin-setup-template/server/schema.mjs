// Field-level validation and coercion.
//
// Admin forms post `multipart/form-data` (the template's pattern), so
// every value arrives as a string, a JSON-encoded string (arrays) or a
// File. Each resource declares its fields in the exact key order the
// website's JSON uses; `buildRecord` coerces the raw values, checks
// them, and returns a record ready to be written.

import fs from "node:fs";
import { publicFile } from "./store.mjs";
import { config } from "./config.mjs";

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const bad = (message) => new HttpError(400, message);

/** Lucide icon names the website can render (`IconName` in surgical/src/lib/types.ts). */
export const ICON_NAMES = [
  "Activity", "Award", "Baby", "Bone", "Brain", "Building2", "CheckCircle2",
  "Clock", "Eye", "Globe", "HeartPulse", "Headset", "Microscope", "Package",
  "Pill", "RefreshCw", "ShieldCheck", "Stethoscope", "Syringe", "Target",
  "Truck", "Users", "Wallet", "Zap",
];

/** Tailwind palettes already used by the website's category tiles. */
const PALETTES = [
  "blue", "cyan", "indigo", "purple", "rose", "sky",
  "emerald", "teal", "violet", "orange", "amber", "pink",
];
export const ICON_COLORS = PALETTES.map((p) => `text-${p}-700`);
export const BG_COLORS = PALETTES.map((p) => `bg-${p}-50`);

export const ORDER_STATUSES = ["Processing", "Shipped", "Delivered"];

/** Hosts allowed by `images.remotePatterns` in surgical/next.config.ts. */
const REMOTE_IMAGE_PREFIXES = ["https://images.unsplash.com/"];
const IMAGE_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const slugify = (text) =>
  String(text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isBlank = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

const parseArray = (raw, label) => {
  if (Array.isArray(raw)) return raw;
  if (isBlank(raw)) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    /* fall through */
  }
  throw bad(`${label} must be a list`);
};

function checkImagePath(value, label) {
  if (REMOTE_IMAGE_PREFIXES.some((p) => value.startsWith(p))) return value;
  if (value.startsWith("/")) {
    const file = publicFile(value.split("?")[0]);
    if (file && fs.existsSync(file)) return value;
    throw bad(`${label}: ${value} does not exist in the website's public folder`);
  }
  throw bad(
    `${label} must be an uploaded image, a /assets/... path, or an images.unsplash.com URL (the only remote host the website allows)`
  );
}

function coerce(def, raw, ctx) {
  const label = def.label;

  switch (def.type) {
    case "string":
    case "text":
    case "slug":
    case "enum":
    case "date":
    case "email":
    case "link": {
      const value = isBlank(raw) ? "" : String(raw).trim();
      if (!value) {
        if (def.optional || def.allowEmpty || def.type === "slug") return value;
        throw bad(`${label} is required`);
      }
      if (def.type === "enum" && !def.values.includes(value))
        throw bad(`${label} must be one of: ${def.values.join(", ")}`);
      if (def.type === "date" && (!DATE_RE.test(value) || Number.isNaN(Date.parse(value))))
        throw bad(`${label} must be a date (YYYY-MM-DD)`);
      if (def.type === "email" && !EMAIL_RE.test(value)) throw bad(`${label} must be a valid email`);
      if (def.type === "link" && !value.startsWith("/"))
        throw bad(`${label} must be a website path starting with "/"`);
      return value;
    }

    case "number":
    case "integer": {
      if (isBlank(raw)) {
        if (def.optional) return undefined;
        throw bad(`${label} is required`);
      }
      const value = Number(raw);
      if (!Number.isFinite(value)) throw bad(`${label} must be a number`);
      if (def.type === "integer" && !Number.isInteger(value)) throw bad(`${label} must be a whole number`);
      if (def.min !== undefined && value < def.min) throw bad(`${label} must be at least ${def.min}`);
      if (def.max !== undefined && value > def.max) throw bad(`${label} must be at most ${def.max}`);
      return value;
    }

    case "boolean":
      return raw === true || raw === "true" || raw === "on" || raw === "1";

    case "image": {
      if (raw && typeof raw === "object" && typeof raw.arrayBuffer === "function") {
        const ext = IMAGE_TYPES[raw.type];
        if (!ext) throw bad(`${label} must be a PNG, JPG, WebP, AVIF or GIF image`);
        if (raw.size > config.maxUploadBytes) throw bad(`${label} must be under 5 MB`);
        ctx.uploads.push({ key: def.key, file: raw, ext });
        return null; // replaced with the saved path once the record is valid
      }
      if (isBlank(raw)) throw bad(`${label} is required`);
      return checkImagePath(String(raw).trim(), label);
    }

    case "stringList": {
      const items = parseArray(raw, label)
        .map((s) => String(s ?? "").trim())
        .filter(Boolean);
      if (!items.length && !def.optional) throw bad(`${label} needs at least one entry`);
      return items;
    }

    case "list": {
      const rows = parseArray(raw, label)
        .filter((row) => row && def.fields.some((f) => !isBlank(row[f.key])))
        .map((row, i) => {
          const out = {};
          for (const f of def.fields) {
            out[f.key] = coerce({ ...f, label: `${label} #${i + 1}: ${f.label}` }, row[f.key], ctx);
          }
          return out;
        });
      if (!rows.length && !def.optional) throw bad(`${label} needs at least one entry`);
      return rows;
    }

    default:
      throw new Error(`Unknown field type ${def.type}`);
  }
}

/**
 * Coerce `input` against `fields`, merging over `existing` (keys the
 * schema does not know about are preserved). Returns `{ record, uploads }`;
 * uploads must be saved by the caller before the record is written.
 */
export function buildRecord(fields, input, existing = {}) {
  const ctx = { uploads: [] };
  const values = {};

  for (const def of fields) {
    if (def.derive || def.readOnly) continue;
    const raw = def.key in input ? input[def.key] : existing[def.key];
    values[def.key] = coerce(def, raw, ctx);
  }

  for (const def of fields) {
    if (def.type === "slug" && !values[def.key]) values[def.key] = slugify(values[def.from]);
    if (def.type === "slug" && !SLUG_RE.test(values[def.key]))
      throw bad(`${def.label} may only contain lowercase letters, numbers and hyphens`);
  }

  const record = {};
  if (existing.id !== undefined) record.id = existing.id;
  for (const def of fields) {
    const value = def.derive
      ? def.derive(values)
      : def.readOnly
        ? existing[def.key]
        : values[def.key];
    if (def.optional && (value === "" || value === undefined)) continue;
    if (value !== undefined) record[def.key] = value;
  }
  for (const [key, value] of Object.entries(existing)) {
    if (!(key in record) && !fields.some((f) => f.key === key)) record[key] = value;
  }
  return { record, uploads: ctx.uploads };
}
