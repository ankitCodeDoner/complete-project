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

export const getInitials = (name?: string): string => {
  if (!name) return "AD";
  const parts = name.trim().split(" ");
  const first = parts[0]?.charAt(0) || "";
  const last = parts[1]?.charAt(0) || "";
  return (first + last).toUpperCase();
};
