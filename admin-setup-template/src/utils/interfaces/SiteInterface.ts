// Shapes of the MedVance website's data, mirroring
// surgical/src/lib/types.ts. The admin API returns these records as-is.

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type IconName =
  | "Activity"
  | "Award"
  | "Baby"
  | "Bone"
  | "Brain"
  | "Building2"
  | "CheckCircle2"
  | "Clock"
  | "Eye"
  | "Globe"
  | "HeartPulse"
  | "Headset"
  | "Microscope"
  | "Package"
  | "Pill"
  | "RefreshCw"
  | "ShieldCheck"
  | "Stethoscope"
  | "Syringe"
  | "Target"
  | "Truck"
  | "Users"
  | "Wallet"
  | "Zap";

/** A stored image: a website path (`/assets/...`) or an Unsplash URL. A File while editing. */
export type ImageValue = string | File;

// ── Catalogue ────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: IconName;
  iconColor: string;
  bgColor: string;
  href: string;
  blurb: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  productCount: string;
  href: string;
  description: string;
  origin: string;
  established: string;
  specialities: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  origin: string;
  speciality: string;
  packSize: string;
  generic: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  inStock: boolean;
  description: string;
  specs: ProductSpec[];
  bulkTag?: string;
}

// ── Site content ─────────────────────────────────────────────

export interface SiteBanner {
  id: number;
  image: string;
  alt: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tag: string;
  author: string;
  readTime: string;
  image: string;
  href: string;
  content: string[];
}

export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: IconName;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: IconName;
}

export interface Region {
  id: number;
  name: string;
  code: string;
  description: string;
  markets: string;
}

export interface Company {
  milestones: { year: string; title: string; text: string }[];
  values: { icon: IconName; title: string; text: string }[];
  leadership: { name: string; role: string; bio: string }[];
}

export interface ContactInfo {
  offices: { city: string; address: string; phone: string; email: string }[];
  faqs: { question: string; answer: string }[];
}

// ── Customer account ─────────────────────────────────────────

export interface CustomerProfile {
  business: string;
  contact: string;
  role: string;
  email: string;
  phone: string;
  gst: string;
  verified: boolean;
  creditTerms: string;
  memberSince: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  contact: string;
  line: string;
  city: string;
  state: string;
  pin: string;
  phone: string;
  isDefault: boolean;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered";

export interface OrderItem {
  slug: string;
  name: string;
  image: string;
  packSize: string;
  qty: number;
  price: number;
}

export interface OrderEvent {
  label: string;
  at: string;
}

export interface Order {
  id: string;
  placedOn: string;
  status: OrderStatus;
  payment: string;
  addressId: string;
  items: OrderItem[];
  timeline: OrderEvent[];
  /** Computed by the API. */
  total: number;
  /** Included by GET /order/:id. */
  address?: SavedAddress | null;
}

export interface CustomerNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  read: boolean;
}

export interface DashboardSummary {
  counts: {
    products: number;
    outOfStock: number;
    categories: number;
    brands: number;
    blogPosts: number;
    orders: number;
    openOrders: number;
    unreadNotifications: number;
  };
  recentOrders: {
    id: string;
    placedOn: string;
    status: OrderStatus;
    payment: string;
    items: number;
    total: number;
    business: string;
  }[];
}
