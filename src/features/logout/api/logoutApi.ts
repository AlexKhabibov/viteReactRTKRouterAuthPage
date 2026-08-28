import { baseApi } from "@/shared/api/baseApi";

export const logoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "GET",
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApi;