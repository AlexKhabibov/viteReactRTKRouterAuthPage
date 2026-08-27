import { Link } from "react-router-dom";
import { SocialAuth } from "@/features/social-auth";
import { LoginForm } from "@/features/login";

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