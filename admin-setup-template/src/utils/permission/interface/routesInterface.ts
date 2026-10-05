import type { ReactElement } from "react";

export type ClaimType =
  | "Dashboard"  
  
  // Settings
  | "Settings"

  // Menus
  | "Menus";

export interface StaticRouteType {
  path: string;
  claim: ClaimType;
  element: ReactElement;
}
