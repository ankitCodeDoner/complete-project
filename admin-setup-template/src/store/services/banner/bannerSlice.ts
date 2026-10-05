import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  SiteBanner,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBanner: builder.query<ApiResponse<SiteBanner[]>, void>({
      query: () => ApiEndPoints.BANNER.GET_ALL,
    }),
    getBannerById: builder.query<ApiResponse<SiteBanner>, number | undefined>({
      query: (id) => ApiEndPoints.BANNER.GET_BY_ID(id),
    }),
    createBanner: builder.mutation<ApiResponse<SiteBanner>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.BANNER.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateBanner: builder.mutation<ApiResponse<SiteBanner>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.BANNER.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteBanner: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.BANNER.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderBanner: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.BANNER.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetBannerQuery,
  useGetBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useReorderBannerMutation,
} = bannerApi;

export default bannerApi;
