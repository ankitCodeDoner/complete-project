import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const userTypeApi = createApi({
  reducerPath: "userTypeApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserType: builder.query<any, void>({
      query: () => ApiEndPoints.COURSE_LEVEL.GET_ALL,
    }),
    getUserTypeById: builder.query<any, number | undefined>({
      query: (id) => ApiEndPoints.COURSE_LEVEL.GET_BY_ID(id),
    }),
    createUserType: builder.mutation<any, any>({
      query: (formData) => ({
        url: ApiEndPoints.COURSE_LEVEL.CREATE,
        method: "POST",
        body: formData,
      }),
    }),
    updateUserType: builder.mutation<any, { id: number; values: any }>({
      query: ({ id, values }) => ({
        url: ApiEndPoints.COURSE_LEVEL.UPDATE(id),
        method: "PUT",
        body: values,
      }),
    }),
    deleteUserType: builder.mutation<any, number>({
      query: (id) => ({
        url: ApiEndPoints.COURSE_LEVEL.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserTypeQuery,
  useGetUserTypeByIdQuery,
  useCreateUserTypeMutation,
  useUpdateUserTypeMutation,
  useDeleteUserTypeMutation,
} = userTypeApi;

export default userTypeApi;
