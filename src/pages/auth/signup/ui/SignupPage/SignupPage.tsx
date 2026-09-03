import { Link } from "react-router-dom";
import { SocialAuth } from "@/features/social-auth";
import { SignupForm } from "@/features/signup";
import { AuthLayout } from "@/widgets/auth-layout";
import styles from "./SignupPage.module.css";

export function SignupPage() {
    return (
        <AuthLayout>
            <div className={styles.container}>
                <h1>Регистрация</h1>

                <SignupForm />

                <SocialAuth />

                <div className={styles.loginLink}>
                    <span>Уже есть аккаунт?</span>

                    <Link to="/auth/login">
                        Войти
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}