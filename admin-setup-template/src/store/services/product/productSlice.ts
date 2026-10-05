import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Product,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProduct: builder.query<ApiResponse<Product[]>, void>({
      query: () => ApiEndPoints.PRODUCT.GET_ALL,
    }),
    getProductById: builder.query<ApiResponse<Product>, number | undefined>({
      query: (id) => ApiEndPoints.PRODUCT.GET_BY_ID(id),
    }),
    createProduct: builder.mutation<ApiResponse<Product>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.PRODUCT.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.PRODUCT.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteProduct: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.PRODUCT.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderProduct: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.PRODUCT.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReorderProductMutation,
} = productApi;

export default productApi;
