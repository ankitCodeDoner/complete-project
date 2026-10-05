import type { IconName, OrderStatus } from "./interfaces/SiteInterface";

/** Icon names the website can render (surgical/src/lib/icons.ts). */
export const ICON_NAMES: IconName[] = [
  "Activity", "Award", "Baby", "Bone", "Brain", "Building2", "CheckCircle2",
  "Clock", "Eye", "Globe", "HeartPulse", "Headset", "Microscope", "Package",
  "Pill", "RefreshCw", "ShieldCheck", "Stethoscope", "Syringe", "Target",
  "Truck", "Users", "Wallet", "Zap",
];

/**
 * Colour palettes for category tiles. The website stores Tailwind classes
 * (`text-blue-700` / `bg-blue-50`); hex values are for admin previews only.
 */
export const CATEGORY_PALETTES = [
  { name: "blue", icon: "#1d4ed8", bg: "#eff6ff" },
  { name: "cyan", icon: "#0e7490", bg: "#ecfeff" },
  { name: "indigo", icon: "#4338ca", bg: "#eef2ff" },
  { name: "purple", icon: "#7e22ce", bg: "#faf5ff" },
  { name: "rose", icon: "#be123c", bg: "#fff1f2" },
  { name: "sky", icon: "#0369a1", bg: "#f0f9ff" },
  { name: "emerald", icon: "#047857", bg: "#ecfdf5" },
  { name: "teal", icon: "#0f766e", bg: "#f0fdfa" },
  { name: "violet", icon: "#6d28d9", bg: "#f5f3ff" },
  { name: "orange", icon: "#c2410c", bg: "#fff7ed" },
  { name: "amber", icon: "#b45309", bg: "#fffbeb" },
  { name: "pink", icon: "#be185d", bg: "#fdf2f8" },
].map((p) => ({ ...p, iconClass: `text-${p.name}-700`, bgClass: `bg-${p.name}-50` }));

export const paletteFromClass = (iconColor?: string) =>
  CATEGORY_PALETTES.find((p) => p.iconClass === iconColor) ?? CATEGORY_PALETTES[0];

export const ORDER_STATUSES: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

export const ORDER_STATUS_COLORS: Record<OrderStatus, "warning" | "info" | "success"> = {
  Processing: "warning",
  Shipped: "info",
  Delivered: "success",
};

/** Number of products shown as "Top Selling" on the homepage (getFeaturedProducts). */
export const FEATURED_PRODUCT_COUNT = 6;

/** Convert plain strings into the `{ id, name }` options SelectDropdown expects. */
export const toOptions = (values: readonly string[]) =>
  values.map((value) => ({ id: value, name: value }));
