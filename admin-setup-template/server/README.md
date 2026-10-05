# MedVance admin API

A small, dependency-free Node (22+) server that the admin panel talks to. It reads and
writes the website's own content files, `../../surgical/src/data/*.json`, so the website
stays the source of truth and needs no code changes. Uploaded images are saved to
`../../surgical/public/assets/images/uploads/`.

## Run

```bash
cp server/.env.example server/.env   # set ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET
npm run api                          # http://localhost:5000/api
npm run dev                          # admin panel (VITE_BASE_URL in ../.env)
```

When the website runs with `next dev`, changes show up right away. A production build
(`next build`) bundles the JSON and `public/` at build time, so rebuild and redeploy the
website after editing content.

## What it enforces

- Writes keep the website's data shape exactly: key order, line endings and inline formatting.
  A save with no edits produces no diff.
- Images must be an upload, an existing `/assets/...` file, or an `images.unsplash.com` URL.
  That is the only remote host `surgical/next.config.ts` allows, so anything else would break
  the page.
- Slugs are unique. Products must reference an existing category and brand. Changing a
  category or brand slug updates the products that use it. Changing a product slug updates the
  order items that link to it.
- A category or brand that still has products can't be deleted.
- Derived fields are computed: `href`, and `discount` from price and MRP.

## Endpoints

`/product`, `/category`, `/brand`, `/banner`, `/blog`, `/stat`, `/feature`, `/region`,
`/notification`: `GET` list, `GET|PUT|DELETE /:id`, `POST`, `PUT /reorder` (`{ ids }`).
`/order`: list, `GET|PUT /:id` (status, payment, timeline).
`/company`, `/contact`, `/customer/profile`: `GET|PUT`. `/customer/address`: `GET`.
`/dashboard`, `/user/login`, `/user/role`. Images are served from `/assets/*` for previews.
