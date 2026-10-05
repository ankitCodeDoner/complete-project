// One definition per data set the website renders. Field order matches
// the key order in the website's JSON files and the interfaces in
// surgical/src/lib/types.ts.

import { BG_COLORS, ICON_COLORS, ICON_NAMES, ORDER_STATUSES } from "./schema.mjs";

const str = (key, label, extra = {}) => ({ key, label, type: "string", ...extra });
const text = (key, label, extra = {}) => ({ key, label, type: "text", ...extra });
const slug = (from) => ({ key: "slug", label: "Slug", type: "slug", from });
const icon = { key: "icon", label: "Icon", type: "enum", values: ICON_NAMES };

/** Array collections (`id` + fields) that support full CRUD. */
export const collections = {
  banner: {
    label: "Banner",
    file: "banners.json",
    fields: [
      { key: "image", label: "Image", type: "image" },
      str("alt", "Alt text"),
      str("category", "Category label"),
    ],
  },

  category: {
    label: "Category",
    file: "categories.json",
    fields: [
      str("name", "Name"),
      slug("name"),
      icon,
      { key: "iconColor", label: "Icon colour", type: "enum", values: ICON_COLORS },
      { key: "bgColor", label: "Background colour", type: "enum", values: BG_COLORS },
      { key: "href", derive: (v) => `/categories/${v.slug}` },
      text("blurb", "Blurb"),
    ],
    references: { collection: "product", key: "categorySlug" },
  },

  brand: {
    label: "Brand",
    file: "brands.json",
    fields: [
      str("name", "Name"),
      slug("name"),
      { key: "logo", label: "Logo", type: "image" },
      str("productCount", "Product count label"),
      { key: "href", derive: (v) => `/brands/${v.slug}` },
      text("description", "Description"),
      str("origin", "Origin"),
      str("established", "Established"),
      { key: "specialities", label: "Specialities", type: "stringList" },
    ],
    references: { collection: "product", key: "brandSlug" },
  },

  product: {
    label: "Product",
    file: "products.json",
    fields: [
      str("name", "Name"),
      slug("name"),
      str("category", "Category label"),
      str("categorySlug", "Category"),
      str("brand", "Brand label"),
      str("brandSlug", "Brand"),
      str("origin", "Origin"),
      str("speciality", "Speciality"),
      str("packSize", "Pack size"),
      str("generic", "Generic name"),
      { key: "image", label: "Image", type: "image" },
      { key: "rating", label: "Rating", type: "number", min: 0, max: 5 },
      { key: "reviews", label: "Reviews", type: "integer", min: 0 },
      { key: "price", label: "Price", type: "number", min: 1 },
      { key: "originalPrice", label: "Original price (MRP)", type: "number", min: 1 },
      {
        key: "discount",
        derive: (v) => Math.max(0, Math.round((1 - v.price / v.originalPrice) * 100)),
      },
      { key: "inStock", label: "In stock", type: "boolean" },
      text("description", "Description"),
      {
        key: "specs",
        label: "Specifications",
        type: "list",
        fields: [str("label", "Label"), str("value", "Value")],
      },
      str("bulkTag", "Bulk offer tag", { optional: true }),
    ],
    /** Foreign keys checked on save. */
    belongsTo: [
      { key: "categorySlug", collection: "category" },
      { key: "brandSlug", collection: "brand" },
    ],
    check(record) {
      if (record.price > record.originalPrice)
        return "Price cannot be higher than the original price (MRP)";
    },
  },

  blog: {
    label: "Blog post",
    file: "news.json",
    /** Listed newest first; the first post is featured on /blog. */
    prepend: true,
    fields: [
      str("title", "Title"),
      slug("title"),
      text("excerpt", "Excerpt"),
      { key: "date", label: "Date", type: "date" },
      str("tag", "Tag"),
      str("author", "Author"),
      str("readTime", "Read time"),
      { key: "image", label: "Cover image", type: "image" },
      { key: "href", derive: (v) => `/blog/${v.slug}` },
      { key: "content", label: "Paragraphs", type: "stringList" },
    ],
  },

  stat: {
    label: "Stat",
    file: "stats.json",
    fields: [
      str("label", "Label"),
      { key: "value", label: "Value", type: "integer", min: 0 },
      str("suffix", "Suffix", { allowEmpty: true }),
      icon,
    ],
  },

  feature: {
    label: "Feature",
    file: "features.json",
    fields: [str("title", "Title"), text("description", "Description"), icon],
  },

  region: {
    label: "Region",
    file: "regions.json",
    fields: [
      str("name", "Name"),
      str("code", "Code"),
      text("description", "Description"),
      str("markets", "Markets"),
    ],
  },

  notification: {
    label: "Notification",
    file: "account.json",
    path: "notifications",
    idPrefix: "n",
    /** Listed newest first. */
    prepend: true,
    fields: [
      str("title", "Title"),
      text("body", "Message"),
      str("time", "Time label"),
      { key: "href", label: "Link", type: "link" },
      { key: "read", label: "Read", type: "boolean" },
    ],
  },
};

/** Orders can be viewed and updated, but not created or deleted. */
export const orders = {
  label: "Order",
  file: "account.json",
  path: "orders",
  fields: [
    { key: "placedOn", readOnly: true },
    { key: "status", label: "Status", type: "enum", values: ORDER_STATUSES },
    str("payment", "Payment"),
    { key: "addressId", readOnly: true },
    { key: "items", readOnly: true },
    {
      key: "timeline",
      label: "Timeline",
      type: "list",
      fields: [str("label", "Step"), str("at", "When")],
    },
  ],
};

/** Single-object documents edited as a whole. */
export const documents = {
  company: {
    label: "About page",
    file: "company.json",
    fields: [
      {
        key: "milestones",
        label: "Milestones",
        type: "list",
        fields: [str("year", "Year"), str("title", "Title"), text("text", "Text")],
      },
      {
        key: "values",
        label: "Values",
        type: "list",
        fields: [icon, str("title", "Title"), text("text", "Text")],
      },
      {
        key: "leadership",
        label: "Leadership",
        type: "list",
        fields: [str("name", "Name"), str("role", "Role"), text("bio", "Bio")],
      },
    ],
  },

  contact: {
    label: "Contact & FAQs",
    file: "contact.json",
    fields: [
      {
        key: "offices",
        label: "Offices",
        type: "list",
        fields: [
          str("city", "City"),
          text("address", "Address"),
          str("phone", "Phone"),
          { key: "email", label: "Email", type: "email" },
        ],
      },
      {
        key: "faqs",
        label: "FAQs",
        type: "list",
        fields: [str("question", "Question"), text("answer", "Answer")],
      },
    ],
  },

  customer: {
    label: "Customer profile",
    file: "account.json",
    path: "profile",
    fields: [
      str("business", "Business name"),
      str("contact", "Contact person"),
      str("role", "Role"),
      { key: "email", label: "Email", type: "email" },
      str("phone", "Phone"),
      str("gst", "GST number"),
      { key: "verified", label: "Verified", type: "boolean" },
      str("creditTerms", "Credit terms"),
      str("memberSince", "Member since"),
    ],
  },
};
