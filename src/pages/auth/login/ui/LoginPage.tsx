import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm/LoginForm";
import { SocialAuth } from "@/features/social-auth";

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