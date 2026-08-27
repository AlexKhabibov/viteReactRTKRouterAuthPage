import { Link } from "react-router-dom";
import { SocialAuth } from "@/features/social-auth";
import { SignupForm } from "@/features/signup";

export function SignupPage() {
    return (
        <>
            <SignupForm />

            <SocialAuth />

            <Link to="/auth/login">
                Войти
            </Link>
        </>
    )
};