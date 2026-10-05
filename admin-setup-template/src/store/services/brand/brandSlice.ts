import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Brand,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBrand: builder.query<ApiResponse<Brand[]>, void>({
      query: () => ApiEndPoints.BRAND.GET_ALL,
    }),
    getBrandById: builder.query<ApiResponse<Brand>, number | undefined>({
      query: (id) => ApiEndPoints.BRAND.GET_BY_ID(id),
    }),
    createBrand: builder.mutation<ApiResponse<Brand>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.BRAND.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateBrand: builder.mutation<ApiResponse<Brand>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.BRAND.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteBrand: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.BRAND.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderBrand: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.BRAND.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetBrandQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useReorderBrandMutation,
} = brandApi;

export default brandApi;
