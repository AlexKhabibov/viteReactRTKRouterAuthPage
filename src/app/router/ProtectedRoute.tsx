import { getAccessToken } from "@/shared/api/lib/auth/token";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const token = getAccessToken();

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}