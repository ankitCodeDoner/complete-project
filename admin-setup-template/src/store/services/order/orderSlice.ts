import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type { ApiResponse, Order } from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

// Orders are placed on the website; the admin can review and update them.
const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getOrder: builder.query<ApiResponse<Order[]>, void>({
      query: () => ApiEndPoints.ORDER.GET_ALL,
    }),
    getOrderById: builder.query<ApiResponse<Order>, string | undefined>({
      query: (id) => ApiEndPoints.ORDER.GET_BY_ID(id),
    }),
    updateOrder: builder.mutation<ApiResponse<Order>, { id: string; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.ORDER.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
  }),
});

export const { useGetOrderQuery, useGetOrderByIdQuery, useUpdateOrderMutation } = orderApi;

export default orderApi;
