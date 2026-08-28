import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/logoutApi";
import { removeAccessToken } from "@/shared/api/lib";

export function LogoutButton() {
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();

            removeAccessToken();
            navigate("/auth/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Выход..." : "Выйти"}
        </button>
    );
};