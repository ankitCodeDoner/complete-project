export const IconButtonIconColors = {
  WHITE: "#ffffff",
  BLACK: "#000000",
  YELLOW: "#fde68a",
} as const;

export const IconButtonBgColors = {
  RED: "#dc2626",
  BLUE: "#2563eb",
  GREEN: "#16a34a",
  ORANGE: "#f97316",
  PURPLE: "#7c3aed",
  GRAY: "#6b7280",
  PRIMARY: "#75158A",
} as const;

// Keys types
export type IconButtonIconColorKeys = keyof typeof IconButtonIconColors;
export type IconButtonBgColorKeys = keyof typeof IconButtonBgColors;

// Values types
export type IconButtonIconColors =
  (typeof IconButtonIconColors)[IconButtonIconColorKeys];
export type IconButtonBgColors =
  (typeof IconButtonBgColors)[IconButtonBgColorKeys];
