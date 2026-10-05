import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "data" in error) {
    const apiError = error as FetchBaseQueryError;
    if (
      apiError.data &&
      typeof apiError.data === "object" &&
      "messages" in apiError.data
    ) {
      return (
        (apiError.data as { messages?: string[] }).messages?.[0] ||
        "Invalid login credentials"
      );
    }
  }
  return "Invalid login credentials";
};

export function buildPath(pathTemplate: string, id: number | string) {
  return pathTemplate.replace(":id", id.toString());
}

/** Message from an API error response (`{ message }`), or `fallback`. */
export const getApiError = (error: unknown, fallback = "Something went wrong."): string => {
  const data = (error as FetchBaseQueryError | undefined)?.data as
    | { message?: string }
    | undefined;
  return data?.message || fallback;
};

/**
 * Build multipart form data from Formik values (same rules as the menu
 * form): Files/Blobs are sent as-is, arrays/objects as JSON, everything
 * else as strings. Empty strings are sent so fields can be cleared.
 */
export const toFormData = (values: Record<string, unknown>): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (value instanceof Blob) formData.append(key, value);
    else if (typeof value === "object") formData.append(key, JSON.stringify(value));
    else formData.append(key, String(value));
  });
  return formData;
};

/** Absolute URL for a website image path (`/assets/...`) so the admin can preview it. */
export const assetUrl = (path?: string): string => {
  if (!path || /^https?:\/\//.test(path)) return path || "";
  const base =
    import.meta.env.VITE_ASSET_BASE_URL || new URL(import.meta.env.VITE_BASE_URL).origin;
  return new URL(path, base).toString();
};

export const formatInr = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** Ids of `items` with the item at `index` moved one step up (-1) or down (+1). */
export const moveId = <T extends { id: number | string }>(
  items: T[],
  index: number,
  direction: -1 | 1
): (number | string)[] => {
  const ids = items.map((item) => item.id);
  const target = index + direction;
  if (target < 0 || target >= ids.length) return ids;
  [ids[index], ids[target]] = [ids[target], ids[index]];
  return ids;
};

export const getInitials = (name?: string): string => {
  if (!name) return "AD";
  const parts = name.trim().split(" ");
  const first = parts[0]?.charAt(0) || "";
  const last = parts[1]?.charAt(0) || "";
  return (first + last).toUpperCase();
};
