import { ForgotPasswordForm } from "@/features/forgot-password";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {

    return (

        <>
            <h1>Восстановление пароля</h1>

            <ForgotPasswordForm />

            <Link to="/auth/signup">
                Зарегистрироваться
            </Link>
        </>
    );
};