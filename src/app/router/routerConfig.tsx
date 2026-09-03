import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/signup";
import { ForgotPasswordPage } from "@/pages/auth/forgot-password";
import { ResetPasswordPage } from "@/pages/auth/reset-password";
import { ProfileEditPage, ProfileViewPage } from "@/pages/profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";

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
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: "profile",
                        element: <ProfileViewPage />,
                    },
                    {
                        path: "profile/edit",
                        element: <ProfileEditPage />,
                    },
                ],
            },
        ],
    },
]);