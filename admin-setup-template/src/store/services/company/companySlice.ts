import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type { ApiResponse, Company } from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

// About page content: milestones, values and leadership.
const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCompany: builder.query<ApiResponse<Company>, void>({
      query: () => ApiEndPoints.COMPANY.GET,
    }),
    updateCompany: builder.mutation<ApiResponse<Company>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.COMPANY.UPDATE,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const { useGetCompanyQuery, useUpdateCompanyMutation } = companyApi;

export default companyApi;
