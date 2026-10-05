import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  BlogPost,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBlogPost: builder.query<ApiResponse<BlogPost[]>, void>({
      query: () => ApiEndPoints.BLOG.GET_ALL,
    }),
    getBlogPostById: builder.query<ApiResponse<BlogPost>, number | undefined>({
      query: (id) => ApiEndPoints.BLOG.GET_BY_ID(id),
    }),
    createBlogPost: builder.mutation<ApiResponse<BlogPost>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.BLOG.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateBlogPost: builder.mutation<ApiResponse<BlogPost>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.BLOG.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteBlogPost: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.BLOG.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderBlogPost: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.BLOG.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetBlogPostQuery,
  useGetBlogPostByIdQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  useReorderBlogPostMutation,
} = blogApi;

export default blogApi;
