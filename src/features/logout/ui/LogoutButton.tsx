import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/logoutApi";
import { removeAccessToken } from "@/shared/api/lib";
import styles from "./LogoutButton.module.css";

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
            className={styles.button}
        >
            <span className={styles.icon}>⇥</span>

            {!isCollapsed && (
                <span className={styles.label}>
                    {isLoading ? "Выход..." : "Выход"}
                </span>
            )}
        </button>
    );
}