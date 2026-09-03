import { baseApi } from "@/shared/api/baseApi";

interface UpdateUserRequest {
    username?: string;
    country?: string;
    city?: string;
    birthday?: string;
    address?: string;
    avatarUrl?: string;
    avatarImage?: string;
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation<
            void,
            { id: string; data: UpdateUserRequest }
        >({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const { useUpdateUserMutation } = userApi;