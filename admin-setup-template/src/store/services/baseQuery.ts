import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { AppEndPoints } from "../../utils/rout-endpoints/AppEndPoints";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// An expired or invalid session sends the user back to the login page.
export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401 && localStorage.getItem("authToken")) {
    localStorage.removeItem("authToken");
    window.location.assign(AppEndPoints.LOGIN);
  }
  return result;
};
