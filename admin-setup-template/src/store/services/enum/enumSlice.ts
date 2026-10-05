import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndPoints } from "../../../utils/rout-endpoints/ApiEndPoints";
import { baseQuery } from "../baseQuery";

const enumApi = createApi({
  reducerPath: "enumApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
   
    getDocumentType: builder.query<any, void>({
      query: () => ApiEndPoints.ENUM.DOCUMENT_TYPE,
    }),
  }),
});

export const { useGetDocumentTypeQuery} = enumApi;

export default enumApi;
