// ─────────────────────────────────────────────────────────────
// Configuration for the MedVance admin API.
//
// The public website (../../surgical) reads all of its content from
// JSON files in `src/data` and serves images from `public/`. This API
// reads and writes those same files, so the website stays the single
// source of truth and needs no code changes.
//
// Values come from `server/.env` (see `.env.example`).
// ─────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(here, ".env");
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const required = (name) => {
  const value = process.env[name];
  if (!value) {
    console.error(
      `Missing ${name}. Copy server/.env.example to server/.env and fill it in.`
    );
    process.exit(1);
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT || 5000),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  dataDir: path.resolve(here, process.env.SITE_DATA_DIR || "../../surgical/src/data"),
  publicDir: path.resolve(here, process.env.SITE_PUBLIC_DIR || "../../surgical/public"),
  /** Uploaded images land here, relative to `publicDir`. */
  uploadDir: "assets/images/uploads",
  maxUploadBytes: 5 * 1024 * 1024,
  admin: {
    name: process.env.ADMIN_NAME || "MedVance Admin",
    email: required("ADMIN_EMAIL"),
    password: required("ADMIN_PASSWORD"),
  },
  jwtSecret: required("JWT_SECRET"),
  tokenTtlSeconds: 60 * 60 * 12,
};

for (const dir of [config.dataDir, config.publicDir]) {
  if (!fs.existsSync(dir)) {
    console.error(`Website directory not found: ${dir}`);
    process.exit(1);
  }
}
