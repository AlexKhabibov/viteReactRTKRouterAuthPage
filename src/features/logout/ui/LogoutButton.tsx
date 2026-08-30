import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/logoutApi";
import { removeAccessToken } from "@/shared/api/lib";

interface LogoutButtonProps {
    isCollapsed: boolean;
}

export function LogoutButton({
    isCollapsed,
}: LogoutButtonProps) {
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            removeAccessToken();

            navigate("/auth/login", {
                replace: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
        >
            <span>🚪</span>

            {!isCollapsed && (
                <span>
                    {isLoading ? "Выход..." : "Выйти"}
                </span>
            )}
        </button>
    );
}