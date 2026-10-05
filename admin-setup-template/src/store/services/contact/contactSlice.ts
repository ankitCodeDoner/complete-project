import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type { ApiResponse, ContactInfo } from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

// Offices and FAQs shown on the contact and support pages.
const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getContact: builder.query<ApiResponse<ContactInfo>, void>({
      query: () => ApiEndPoints.CONTACT.GET,
    }),
    updateContact: builder.mutation<ApiResponse<ContactInfo>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.CONTACT.UPDATE,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const { useGetContactQuery, useUpdateContactMutation } = contactApi;

export default contactApi;
