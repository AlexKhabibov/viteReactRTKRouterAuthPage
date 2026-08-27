import { Link } from "react-router-dom";
import { SocialAuth } from "../../login/ui/SocialAuth/SocialAuth";
import { SignupForm } from "./SignupForm/SignupForm";

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