import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Category,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategory: builder.query<ApiResponse<Category[]>, void>({
      query: () => ApiEndPoints.CATEGORY.GET_ALL,
    }),
    getCategoryById: builder.query<ApiResponse<Category>, number | undefined>({
      query: (id) => ApiEndPoints.CATEGORY.GET_BY_ID(id),
    }),
    createCategory: builder.mutation<ApiResponse<Category>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.CATEGORY.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateCategory: builder.mutation<ApiResponse<Category>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.CATEGORY.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteCategory: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.CATEGORY.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderCategory: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.CATEGORY.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoryMutation,
} = categoryApi;

export default categoryApi;
