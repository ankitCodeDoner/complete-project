import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Feature,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const featureApi = createApi({
  reducerPath: "featureApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFeature: builder.query<ApiResponse<Feature[]>, void>({
      query: () => ApiEndPoints.FEATURE.GET_ALL,
    }),
    createFeature: builder.mutation<ApiResponse<Feature>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.FEATURE.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateFeature: builder.mutation<ApiResponse<Feature>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.FEATURE.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteFeature: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.FEATURE.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderFeature: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.FEATURE.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetFeatureQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useReorderFeatureMutation,
} = featureApi;

export default featureApi;
