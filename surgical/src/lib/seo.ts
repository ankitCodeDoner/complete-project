import type { Metadata } from "next";
import type { NewsItem, Office, Product } from "@/lib/types";

export const SITE_NAME = "MedVance Healthcare";

export const SITE_DESCRIPTION =
  "India's B2B marketplace for surgical instruments, medical equipment, diagnostics, consumables and more. Wholesale pricing, fast delivery and secure procurement for hospitals, clinics and labs.";

/**
 * Absolute origin used for canonical URLs, Open Graph, sitemaps and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production (no trailing slash).
 */
export const SITE_URL = resolveSiteUrl();

const DEFAULT_KEYWORDS = [
  "MedVance",
  "B2B medical supplies",
  "surgical instruments",
  "wholesale medical equipment",
  "hospital procurement",
];

type OpenGraphKind = "website" | "article";

type PageSeoInput = {
  title: string;
  description: string;
  /** Path beginning with `/`. Use `/` for the homepage. */
  path: string;
  image?: string | null;
  imageAlt?: string;
  keywords?: string[];
  /** Skip the root title template, for the homepage. */
  absoluteTitle?: boolean;
  /** Private routes such as cart and login. */
  noIndex?: boolean;
  openGraphType?: OpenGraphKind;
  publishedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

/** Shared metadata for static and dynamic routes. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
  absoluteTitle = false,
  noIndex = false,
  openGraphType = "website",
  publishedTime,
  authors,
  section,
  tags,
}: PageSeoInput): Metadata {
  const desc = truncate(description);
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const images = image
    ? [{ url: image, alt: imageAlt ?? title }]
    : [
        {
          url: "/opengraph-image",
          alt: `${SITE_NAME} — B2B Medical Supplies Marketplace`,
          width: 1200,
          height: 630,
        },
      ];

  const openGraphBase = {
    title,
    description: desc,
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_IN",
    images,
  };

  const openGraph =
    openGraphType === "article"
      ? {
          ...openGraphBase,
          type: "article" as const,
          publishedTime,
          authors,
          section,
          tags,
        }
      : {
          ...openGraphBase,
          type: "website" as const,
        };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : undefined,
    openGraph,
    twitter: {
      card: "summary_large_image" as const,
      title,
      description: desc,
      images,
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — B2B Medical Supplies Marketplace`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    keywords: DEFAULT_KEYWORDS,
    category: "health",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: "/",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — B2B Medical Supplies Marketplace`,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — B2B Medical Supplies Marketplace`,
      description: SITE_DESCRIPTION,
    },
  };
}

export function organizationGraph(office?: Office) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        email: office?.email,
        telephone: office?.phone,
        address: office
          ? {
              "@type": "PostalAddress",
              streetAddress: office.address,
              addressLocality: office.city,
              addressCountry: "IN",
            }
          : undefined,
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: { "@type": "Organization", name: SITE_NAME },
      },
    ],
  };
}

export function productGraph(
  product: Product,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: [product.image],
        sku: String(product.id),
        category: product.category,
        brand: { "@type": "Brand", name: product.brand },
        url: absoluteUrl(`/products/${product.slug}`),
        aggregateRating:
          product.reviews > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews,
                bestRating: 5,
                worstRating: 1,
              }
            : undefined,
        offers: {
          "@type": "Offer",
          url: absoluteUrl(`/products/${product.slug}`),
          priceCurrency: "INR",
          price: product.price,
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      },
      breadcrumbList(crumbs),
    ],
  };
}

export function articleGraph(
  post: NewsItem,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: [post.image],
        datePublished: post.date,
        author: { "@type": "Person", name: post.author },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        articleSection: post.tag,
        keywords: post.tag,
      },
      breadcrumbList(crumbs),
    ],
  };
}

export function collectionGraph(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
  crumbs: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: input.name,
        description: truncate(input.description),
        url: absoluteUrl(input.path),
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: input.items.length,
          itemListElement: input.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: absoluteUrl(item.path),
          })),
        },
      },
      breadcrumbList(input.crumbs),
    ],
  };
}

function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function truncate(text: string, max = 220): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const base = lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced;
  return `${base.trimEnd()}…`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "https://medvance.example";
}
