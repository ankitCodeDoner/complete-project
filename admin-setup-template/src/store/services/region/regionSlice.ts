import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Region,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const regionApi = createApi({
  reducerPath: "regionApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getRegion: builder.query<ApiResponse<Region[]>, void>({
      query: () => ApiEndPoints.REGION.GET_ALL,
    }),
    createRegion: builder.mutation<ApiResponse<Region>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.REGION.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateRegion: builder.mutation<ApiResponse<Region>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.REGION.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteRegion: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.REGION.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderRegion: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.REGION.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetRegionQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
  useReorderRegionMutation,
} = regionApi;

export default regionApi;
