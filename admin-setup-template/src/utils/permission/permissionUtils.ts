import type { ClaimType } from "./interface/routesInterface";

export const extractClaimList = (menus: any[]): string[] => {
  const claims: string[] = [];
  const walk = (items: any[]) => {
    for (const item of items) {
      if (item.claimValue) claims.push(item.claimValue);
      if (item.children?.length) walk(item.children);
    }
  };
  walk(menus);
  return claims;
};

export const hasPermission = (roleData: any[], claim: ClaimType): boolean => {
  if (!roleData?.length) return false;
  const claims = extractClaimList(roleData[0].roleMenus || []);
  return claims.includes(claim);
};

export const hasAnyPermission = (
  roleData: any[],
  claimsToCheck: ClaimType[]
): boolean => {
  if (!roleData?.length) return false;
  const claims = extractClaimList(roleData[0].roleMenus || []);
  return claimsToCheck.some((claim) => claims.includes(claim));
};
