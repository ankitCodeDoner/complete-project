import type { MetadataRoute } from "next";
import {
  getBrands,
  getCategories,
  getNews,
  getProducts,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, brands, news] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getNews(),
  ]);

  const staticPaths = [
    "/",
    "/about",
    "/products",
    "/categories",
    "/brands",
    "/blog",
    "/contact",
    "/export",
    "/privacy-policy",
    "/terms",
    "/shipping-policy",
    "/return-policy",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/categories/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...brands.map((brand) => ({
      url: absoluteUrl(`/brands/${brand.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [product.image],
    })),
    ...news.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [post.image],
    })),
  ];
}
