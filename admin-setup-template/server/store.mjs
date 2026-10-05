// Reads and writes the website's JSON data files.
//
// Writes go to a temp file first and are then renamed into place, so
// the Next.js dev server never picks up a half-written file. Each
// file's existing line endings (CRLF/LF) are preserved.

import fs from "node:fs";
import path from "node:path";
import { config } from "./config.mjs";

const filePath = (file) => path.join(config.dataDir, file);

export function readJson(file) {
  return JSON.parse(fs.readFileSync(filePath(file), "utf8"));
}

const MAX_INLINE_LINE = 100;
const isPrimitive = (v) => v === null || typeof v !== "object";

/**
 * JSON.stringify with 2-space indent, except that short arrays/objects
 * made only of primitives (and not top-level records) stay on one line —
 * the hand-written style of the website's data files, e.g.
 * `{ "label": "Warranty", "value": "2 Years" }`. Keeps git diffs small.
 */
function format(value, indent = "", prefixLength = 0, depth = 0) {
  if (isPrimitive(value)) return JSON.stringify(value);
  const isArray = Array.isArray(value);
  const entries = isArray ? value.map((v) => [null, v]) : Object.entries(value);
  if (!entries.length) return isArray ? "[]" : "{}";

  if (depth >= 2 && entries.every(([, v]) => isPrimitive(v))) {
    const parts = entries.map(([k, v]) => (k === null ? "" : `${JSON.stringify(k)}: `) + JSON.stringify(v));
    const inline = isArray ? `[${parts.join(", ")}]` : `{ ${parts.join(", ")} }`;
    if (indent.length + prefixLength + inline.length + 1 <= MAX_INLINE_LINE) return inline;
  }

  const inner = indent + "  ";
  const lines = entries.map(([k, v]) => {
    const key = k === null ? "" : `${JSON.stringify(k)}: `;
    return inner + key + format(v, inner, key.length, depth + 1);
  });
  return `${isArray ? "[" : "{"}\n${lines.join(",\n")}\n${indent}${isArray ? "]" : "}"}`;
}

export function writeJson(file, data) {
  const target = filePath(file);
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
  const eol = current.includes("\r\n") ? "\r\n" : "\n";
  const text = format(data).replace(/\n/g, eol) + eol;
  const tmp = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, text, "utf8");
  fs.renameSync(tmp, target);
}

/** Path of a file inside the website's `public/` dir, or null if it escapes it. */
export function publicFile(urlPath) {
  const resolved = path.resolve(config.publicDir, "." + decodeURIComponent(urlPath));
  return resolved.startsWith(config.publicDir + path.sep) ? resolved : null;
}
