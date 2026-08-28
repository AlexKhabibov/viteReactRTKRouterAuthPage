import { baseApi } from "@/shared/api/baseApi";

interface ForgotPasswordResponse {
    message: string;
}

export const forgotPasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendResetPassword: builder.mutation<
            ForgotPasswordResponse,
            string
        >({
            query: (email) => ({
                url: "/auth/send-reset-password",
                method: "GET",
                params: {
                    email,
                },
            }),
        }),
    }),
});

export const { useSendResetPasswordMutation } = forgotPasswordApi;