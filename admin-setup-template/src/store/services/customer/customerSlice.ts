import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  CustomerProfile,
  SavedAddress,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

// The website's B2B customer account (profile + saved addresses).
const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCustomerProfile: builder.query<ApiResponse<CustomerProfile>, void>({
      query: () => ApiEndPoints.CUSTOMER.PROFILE,
    }),
    updateCustomerProfile: builder.mutation<ApiResponse<CustomerProfile>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.CUSTOMER.PROFILE,
        method: "PUT",
        body: formData,
      }),
    }),
    getCustomerAddresses: builder.query<ApiResponse<SavedAddress[]>, void>({
      query: () => ApiEndPoints.CUSTOMER.ADDRESSES,
    }),
  }),
});

export const {
  useGetCustomerProfileQuery,
  useUpdateCustomerProfileMutation,
  useGetCustomerAddressesQuery,
} = customerApi;

export default customerApi;
