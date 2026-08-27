import { baseApi } from "@/shared/api/baseApi";


interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    user: {
        id: string;
        username: string;
        email: string;
        phone: string;
        country: string;
        city: string;
        birthday: string;
        address: string;
        avatarUrl: string;
        updatedAt: string;
        createdAt: string;
        userRoles: {
            id: number;
            name: string;
            permissions: {
                id: number;
                name: string;
            }[];
        }[];
        isVerified: boolean;
        isEmailNotificationsEnable: boolean;
    };
}

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;