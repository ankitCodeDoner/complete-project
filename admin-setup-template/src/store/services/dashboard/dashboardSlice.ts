import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type { ApiResponse, DashboardSummary } from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<ApiResponse<DashboardSummary>, void>({
      query: () => ApiEndPoints.DASHBOARD.SUMMARY,
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;

export default dashboardApi;
