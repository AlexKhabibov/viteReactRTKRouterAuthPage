import { SocialAuth } from "../../login/ui/SocialAuth/SocialAuth";
import { SignupForm } from "./SignupForm/SignupForm";

export function SignupPage() {
    return (
        <>
            страница регистрации

            <SignupForm />

            <SocialAuth />
        </>
    )
};