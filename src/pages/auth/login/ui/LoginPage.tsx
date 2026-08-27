import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm/LoginForm";
import { SocialAuth } from "./SocialAuth/SocialAuth";

export function LoginPage() {
    return (
        <>
            <LoginForm />

            <SocialAuth />

            <Link to="/auth/signup">
                Зарегистрироваться
            </Link>
        </>
    )
};