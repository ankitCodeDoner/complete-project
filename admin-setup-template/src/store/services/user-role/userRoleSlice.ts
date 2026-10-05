import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const userRoleApi = createApi({
  reducerPath: "userRoleApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserRole: builder.query<any, Record<string, any>>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `${ApiEndPoints.USER_ROLE.GET_ALL}?${queryString}`;
      },
    }),

    getUserRoleLookup: builder.query<any, void>({
      query: () => ApiEndPoints.USER_ROLE.LOOKUP,
    }),
    getUserRoleById: builder.query<any, number | undefined>({
      query: (id) => ApiEndPoints.USER_ROLE.GET_BY_ID(id),
    }),
    createUserRole: builder.mutation<any, any>({
      query: (formData) => ({
        url: ApiEndPoints.USER_ROLE.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateUserRole: builder.mutation<any, { id: number; values: any }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.USER_ROLE.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteUserRole: builder.mutation<any, number>({
      query: (id) => ({
        url: ApiEndPoints.USER_ROLE.DELETE(id),
        method: "DELETE",
      }),
    }),
    getUsers: builder.query<any, Record<string, any>>({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `${ApiEndPoints.USER.USER_GET}?${queryString}`;
      },
    }),
    getUserById: builder.query<any, string | undefined>({
      query: (id) => ApiEndPoints.USER.GET_BY_ID(id),
    }),
    getUserLookup: builder.query<any, void>({
      query: () => ApiEndPoints.USER.LOOKUP,
    }),
  }),
});

export const {
  useGetUserRoleQuery,
  useGetUsersQuery,
  useGetUserRoleLookupQuery,
  useGetUserRoleByIdQuery,
  useCreateUserRoleMutation,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
  useGetUserByIdQuery,
  useGetUserLookupQuery,
} = userRoleApi;

export default userRoleApi;
