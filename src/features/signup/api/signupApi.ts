import { baseApi } from "@/shared/api/baseApi";

interface SignupRequest {
    username: string;
    password: string;
    email: string;
}

interface SignupResponse {
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

export const signupApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupRequest>({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useSignupMutation } = signupApi;