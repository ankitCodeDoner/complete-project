import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useGetUserRoleQuery } from "../store/services/user-role/userRoleSlice";

interface JwtPayload {
  Id: string;
  Role: string;
  Email: string;
  MobileNo: string;
  EmployeeId: string;
  Name: string;
  IsEmailConfirmed: boolean;
  Code: string;
  exp?: number;
  iat?: number;
}

interface Roles {
  id: number;
  name: string;
  roleMenus: any[];
}

export const useUserRole = () => {
  const token = localStorage.getItem("authToken");

  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
        console.log("Decoded token:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Invalid JWT token:", error);
      return null;
    }
  }, [token]);

    const userId = decoded?.Id;
    const queryEnabled = !!userId;

    const { data, isLoading, isError, refetch } = useGetUserRoleQuery({userId}, {
      skip: !queryEnabled,
    });

    const userRole: Roles[] = data?.data;
    console.log("User role:", userRole);
  return {
    roleData: userRole,
    isLoading,
    isError,
    decoded,
    refetch,
  };
};
