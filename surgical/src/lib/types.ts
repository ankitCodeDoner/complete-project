// ─────────────────────────────────────────────────────────────
// Shared domain types for the MedVance data layer.
//
// These describe the shape of the local JSON records in `src/data`
// and the values returned by the loaders in `src/lib/data.ts`.
// Keeping them here (framework-agnostic, serializable) means the
// JSON source can later be swapped for a real API without touching
// the components that consume the data.
//
// NOTE: icons are stored as *string names* (see `IconName`) rather
// than React components so records stay JSON-serializable and safe
// to pass from Server Components to Client Components as props.
// ─────────────────────────────────────────────────────────────

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

export interface Banner {
  id: number;
  image: string;
  alt: string;
  category: string;
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

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: IconName;
  iconColor: string;
  bgColor: string;
  href: string;
  /** Short tagline shown under the H1 on the category page. */
  blurb: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  /** Human-readable category label, e.g. "Dental Equipment". */
  category: string;
  /** Slug matching a `Category.slug`, used for filtering/listing. */
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

export interface Stat {
  id: number;
  label: string;
  value: number;
  /** Text appended after the animated number, e.g. "+", "K+", "%". */
  suffix: string;
  icon: IconName;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: IconName;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  /** ISO date string, e.g. "2026-08-14". */
  date: string;
  tag: string;
  author: string;
  readTime: string;
  image: string;
  href: string;
  /** Full article body as an array of paragraphs. */
  content: string[];
}

export interface Region {
  id: number;
  name: string;
  code: string;
  description: string;
  markets: string;
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export interface Value {
  icon: IconName;
  title: string;
  text: string;
}

export interface Leader {
  name: string;
  role: string;
  bio: string;
}

export interface Company {
  milestones: Milestone[];
  values: Value[];
  leadership: Leader[];
}

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ContactInfo {
  offices: Office[];
  faqs: Faq[];
}

export interface AccountProfile {
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

export interface AccountOrder {
  id: string;
  placedOn: string;
  status: OrderStatus;
  payment: string;
  addressId: string;
  items: OrderItem[];
  timeline: OrderEvent[];
}

export interface AccountNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  href: string;
  read: boolean;
}

export interface AccountData {
  profile: AccountProfile;
  addresses: SavedAddress[];
  orders: AccountOrder[];
  notifications: AccountNotification[];
}
