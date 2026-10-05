// ─────────────────────────────────────────────────────────────
// Data loaders for the MedVance marketplace.
//
// Today these read from local JSON files in `src/data`. They are
// intentionally written as `async` functions returning typed data
// so the backing source can later be swapped for a real API (e.g.
// `await fetch(...)`) without changing any calling component.
//
// Call these from Server Components and pass the results down to
// Client Components as props (all return values are serializable).
// ─────────────────────────────────────────────────────────────

import bannersJson from "@/data/banners.json";
import brandsJson from "@/data/brands.json";
import categoriesJson from "@/data/categories.json";
import productsJson from "@/data/products.json";
import statsJson from "@/data/stats.json";
import featuresJson from "@/data/features.json";
import newsJson from "@/data/news.json";
import regionsJson from "@/data/regions.json";
import companyJson from "@/data/company.json";
import contactJson from "@/data/contact.json";

import type {
  Banner,
  Brand,
  Category,
  Product,
  Stat,
  Feature,
  NewsItem,
  Region,
  Company,
  ContactInfo,
} from "./types";

// ── Collections ───────────────────────────────────────────────

export async function getBanners(): Promise<Banner[]> {
  return bannersJson as Banner[];
}

export async function getBrands(): Promise<Brand[]> {
  return brandsJson as Brand[];
}

export async function getCategories(): Promise<Category[]> {
  return categoriesJson as Category[];
}

export async function getProducts(): Promise<Product[]> {
  return productsJson as Product[];
}

/** Featured / top-selling products shown on the homepage. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return (productsJson as Product[]).slice(0, 6);
}

export async function getStats(): Promise<Stat[]> {
  return statsJson as Stat[];
}

export async function getFeatures(): Promise<Feature[]> {
  return featuresJson as Feature[];
}

export async function getNews(): Promise<NewsItem[]> {
  return newsJson as NewsItem[];
}

export async function getRegions(): Promise<Region[]> {
  return regionsJson as Region[];
}

export async function getCompany(): Promise<Company> {
  return companyJson as Company;
}

export async function getContact(): Promise<ContactInfo> {
  return contactJson as ContactInfo;
}

// ── Lookups ───────────────────────────────────────────────────

export async function getCategory(
  slug: string
): Promise<Category | undefined> {
  return (categoriesJson as Category[]).find((c) => c.slug === slug);
}

export async function getBrand(slug: string): Promise<Brand | undefined> {
  return (brandsJson as Brand[]).find((b) => b.slug === slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (productsJson as Product[]).find((p) => p.slug === slug);
}

export async function getNewsItem(
  slug: string
): Promise<NewsItem | undefined> {
  return (newsJson as NewsItem[]).find((n) => n.slug === slug);
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return (productsJson as Product[]).filter(
    (p) => p.categorySlug === categorySlug
  );
}

export async function getProductsByBrand(
  brandSlug: string
): Promise<Product[]> {
  return (productsJson as Product[]).filter((p) => p.brandSlug === brandSlug);
}

/** Products related to `product` (same category, excluding itself). */
export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  return (productsJson as Product[])
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    )
    .slice(0, limit);
}
