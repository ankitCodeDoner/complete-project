import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import type {
  ApiResponse,
  CustomerNotification,
} from "../../../utils/interfaces/SiteInterface";
import { baseQuery } from "../baseQuery";

const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getNotification: builder.query<ApiResponse<CustomerNotification[]>, void>({
      query: () => ApiEndPoints.NOTIFICATION.GET_ALL,
    }),
    createNotification: builder.mutation<ApiResponse<CustomerNotification>, FormData>({
      query: (formData) => ({
        url: ApiEndPoints.NOTIFICATION.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateNotification: builder.mutation<ApiResponse<CustomerNotification>, { id: string; values: FormData }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.NOTIFICATION.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteNotification: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: ApiEndPoints.NOTIFICATION.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;

export default notificationApi;
