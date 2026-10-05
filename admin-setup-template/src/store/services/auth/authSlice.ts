import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, { code: string; password: string }>({
      query: ({ code, password }) => {
        return {
          url: ApiEndPoints.USER_LOGIN.LOGIN,
          method: "POST",
          body: {
            password,
            code,
          },
        };
      },
    }),
    forgetPassword: builder.mutation<any, { emailOrPhone: string }>({
      query: ({ emailOrPhone }) => {
        const isPhone = /^[\d+]{7,15}$/.test(emailOrPhone);

        const param = isPhone
          ? `phoneNumber=${emailOrPhone}`
          : `email=${emailOrPhone}`;

        return {
          url: `${ApiEndPoints.USER_LOGIN.FORGET_PASSWORD}?${param}`,
          method: "POST",
        };
      },
    }),
    resetPassword: builder.mutation<
      any,
      { token: string | null; newPassword: string }
    >({
      query: ({ token, newPassword }) => ({
        url: ApiEndPoints.USER_LOGIN.RESET_PASSWORD,
        method: "PUT",
        body: { token, newPassword },
      }),
    }),
    verifyOtp: builder.mutation<any, { otp: number; emailOrPhone: string }>({
      query: ({ otp, emailOrPhone }) => {
        const isPhone = /^[\d+]{7,15}$/.test(emailOrPhone);
        return {
          url: `${ApiEndPoints.USER_LOGIN.VERIFY_OTP}`,
          method: "POST",
          body: {
            otp,
            ...(isPhone
              ? { phoneNumber: emailOrPhone }
              : { email: emailOrPhone }),
          },
        };
      },
    }),
    changePassword: builder.mutation<
      any,
      { oldPassword: string; newPassword: string }
    >({
      query: ({ oldPassword, newPassword }) => ({
        url: ApiEndPoints.USER_LOGIN.CHANGE_PASSWORD,
        method: "PUT",
        body: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
