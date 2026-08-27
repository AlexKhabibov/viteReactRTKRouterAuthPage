import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "./constants";

export const baseApi = createApi({

    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),

    endpoints: () => ({
    }),
});