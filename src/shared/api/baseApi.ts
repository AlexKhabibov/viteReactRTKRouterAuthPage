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
            headers.set(
                "Authorization",
                `Bearer ${token}`,
            );
        }

        return headers;
    },
});

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (
    api: Parameters<BaseQueryFn>[1],
    extraOptions: Parameters<BaseQueryFn>[2],
): Promise<string | null> => {
    const refreshResult = await baseQuery(
        {
            url: "/auth/refresh",
            method: "GET",
        },
        api,
        extraOptions,
    );

    if (refreshResult.data) {
        const data =
            refreshResult.data as RefreshResponse;

        setAccessToken(data.access_token);

        return data.access_token;
    }

    return null;
};

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(
        args,
        api,
        extraOptions,
    );

    if (result.error?.status === 401) {
        if (!refreshPromise) {
            refreshPromise = refreshAccessToken(
                api,
                extraOptions,
            ).finally(() => {
                refreshPromise = null;
            });
        }

        const newToken = await refreshPromise;

        if (newToken) {
            result = await baseQuery(
                args,
                api,
                extraOptions,
            );
        } else {
            removeAccessToken();

            localStorage.removeItem("appState");

            api.dispatch(
                baseApi.util.resetApiState(),
            );

            window.location.href = "/auth/login";
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ["Profile"],
});