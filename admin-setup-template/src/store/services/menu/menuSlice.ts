import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMenu: builder.query<any, void>({
      query: () => ApiEndPoints.MENU.GET_ALL,
    }),
    getMenuById: builder.query<any, number | undefined>({
      query: (id) => ApiEndPoints.MENU.GET_BY_ID(id),
    }),
    createMenu: builder.mutation<any, any>({
      query: (formData) => ({
        url: ApiEndPoints.MENU.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateMenu: builder.mutation<any, { id: number; values: any }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.MENU.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteMenu: builder.mutation<any, number>({
      query: (id) => ({
        url: ApiEndPoints.MENU.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMenuQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;

export default menuApi;
