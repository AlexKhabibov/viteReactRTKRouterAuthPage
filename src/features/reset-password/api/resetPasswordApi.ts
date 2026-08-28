import { baseApi } from "@/shared/api/baseApi";

interface ResetPasswordRequest {
    password: string;
    passwordConfirm: string;
    token: string;
}

interface ResetPasswordResponse {
    access_token: string;
    user: {
        id: string;
        username: string;
        phone: string;
        email: string;
        country: string;
        city: string;
        address: string;
        avatarUrl: string;
        birthday: string;
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

export const resetPasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        resetPassword: builder.mutation<
            ResetPasswordResponse,
            ResetPasswordRequest
        >({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = resetPasswordApi;