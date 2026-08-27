import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "./ForgotPasswordForm/ForgotPasswordForm";

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