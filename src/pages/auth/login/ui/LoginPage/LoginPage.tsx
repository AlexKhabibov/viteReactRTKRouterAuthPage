import { Link } from "react-router-dom";
import { LoginForm } from "@/features/login";
import { SocialAuth } from "@/features/social-auth";
import { AuthLayout } from "@/widgets/auth-layout";
import styles from "./LoginPage.module.css";

export function LoginPage() {
    return (
        <AuthLayout>
            <div className={styles.container}>
                <h1>Вход в личный кабинет</h1>

                <LoginForm />

                <SocialAuth />

                <div className={styles.switch}>
                    <span>Нет аккаунта?</span>

                    <Link to="/auth/signup">
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}