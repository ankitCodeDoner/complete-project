import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const menuTypeApi = createApi({
  reducerPath: "menuTypeApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMenuType: builder.query<any, void>({
      query: () => ApiEndPoints.MENU_TYPE.GET_ALL,
    }),
    getMenuTypeById: builder.query<any, number | undefined>({
      query: (id) => ApiEndPoints.MENU_TYPE.GET_BY_ID(id),
    }),
    createMenuType: builder.mutation<any, any>({
      query: (formData) => ({
        url: ApiEndPoints.MENU_TYPE.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateMenuType: builder.mutation<any, { id: number; values: any }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.MENU_TYPE.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteMenuType: builder.mutation<any, number>({
      query: (id) => ({
        url: ApiEndPoints.MENU_TYPE.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMenuTypeQuery,
  useGetMenuTypeByIdQuery,
  useCreateMenuTypeMutation,
  useUpdateMenuTypeMutation,
  useDeleteMenuTypeMutation,
} = menuTypeApi;

export default menuTypeApi;
