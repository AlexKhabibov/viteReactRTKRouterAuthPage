import { Link } from "react-router-dom";
import { SignupForm } from "./SignupForm/SignupForm";
import { SocialAuth } from "@/features/social-auth";

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