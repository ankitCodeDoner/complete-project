import type { ReactElement } from "react";

export type ClaimType =
  | "Dashboard"

  // Settings
  | "Settings"

  // Menus
  | "Menus"

  // Catalogue
  | "Products"
  | "Categories"
  | "Brands"

  // Website content
  | "Banners"
  | "BlogPosts"
  | "HomeStats"
  | "HomeFeatures"
  | "ExportRegions"
  | "AboutPage"
  | "ContactPage"

  // Customers
  | "Orders"
  | "CustomerProfile"
  | "CustomerNotifications";

export interface StaticRouteType {
  path: string;
  claim: ClaimType;
  element: ReactElement;
}
