import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  Stat,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const statApi = createApi({
  reducerPath: "statApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getStat: builder.query<ApiResponse<Stat[]>, void>({
      query: () => ApiEndPoints.STAT.GET_ALL,
    }),
    createStat: builder.mutation<ApiResponse<Stat>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.STAT.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateStat: builder.mutation<ApiResponse<Stat>, { id: number; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.STAT.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteStat: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: ApiEndPoints.STAT.DELETE(id),
        method: "DELETE",
      }),
    }),
    reorderStat: builder.mutation<ApiResponse<null>, (number | string)[]>({
      query: (ids) => ({
        url: ApiEndPoints.STAT.REORDER,
        method: "PUT",
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetStatQuery,
  useCreateStatMutation,
  useUpdateStatMutation,
  useDeleteStatMutation,
  useReorderStatMutation,
} = statApi;

export default statApi;
