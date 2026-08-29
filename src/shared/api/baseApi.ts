import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "./constants";
import {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
} from "./lib/auth/token";

interface RefreshResponse {
    access_token: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",

    prepareHeaders: (headers, { arg }) => {
        if (
            typeof arg === "object" &&
            "url" in arg &&
            arg.url === "/auth/refresh"
        ) {
            return headers;
        }

        const token = getAccessToken();

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh",
                method: "GET",
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const data = refreshResult.data as RefreshResponse;

            setAccessToken(data.access_token);

            result = await baseQuery(args, api, extraOptions);
        } else {
            removeAccessToken();
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: baseQueryWithReauth,

    endpoints: () => ({}),
});