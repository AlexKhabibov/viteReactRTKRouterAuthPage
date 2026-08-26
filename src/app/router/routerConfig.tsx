import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/auth/login";
import { createBrowserRouter } from "react-router-dom";
import { SignupPage } from "@/pages/auth/signup";
import { ForgotPasswordPage } from "@/pages/auth/forgot-password";
import { ResetPasswordPage } from "@/pages/auth/reset-password";

export const router = createBrowserRouter([
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage />,
            },
            {
                path: "reset-password",
                element: <ResetPasswordPage />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
]);