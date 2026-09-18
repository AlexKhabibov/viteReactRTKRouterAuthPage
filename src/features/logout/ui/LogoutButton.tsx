import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/logoutApi";
import { removeAccessToken } from "@/shared/api/lib";
import { baseApi } from "@/shared/api/baseApi";
import { useDispatch } from "react-redux";
import styles from "./LogoutButton.module.css";

interface LogoutButtonProps {
    isCollapsed: boolean;
}

export function LogoutButton({
    isCollapsed,
}: LogoutButtonProps) {
    const [logout, { isLoading }] =
        useLogoutMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error(
                "Ошибка запроса logout:",
                error
            );
        } finally {
            removeAccessToken();

            localStorage.removeItem("appState");

            dispatch(
                baseApi.util.resetApiState()
            );

            navigate("/auth/login", {
                replace: true,
            });
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className={styles.button}
        >
            <span className={styles.icon}>
                ⇥
            </span>

            {!isCollapsed && (
                <span className={styles.label}>
                    {isLoading
                        ? "Выход..."
                        : "Выход"}
                </span>
            )}
        </button>
    );
}