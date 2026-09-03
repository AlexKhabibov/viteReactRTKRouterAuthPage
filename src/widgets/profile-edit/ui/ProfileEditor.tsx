import { useState } from "react";
import { ProfileTabs } from "./ProfileTabs";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import { EditAboutForm } from "./EditAboutForm";
import { EditSkillsForm } from "./EditSkillsForm";
import type { Profile } from "@/features/get-profile/api/profileApi";

type ProfileStep = "personal" | "about" | "skills";

interface ProfileEditorProps {
    profile: Profile;
}

export const ProfileEditor = ({ profile }: ProfileEditorProps) => {
    const [step, setStep] = useState<ProfileStep>("personal");

    return (
        <div>
            <ProfileTabs step={step} onChange={setStep} />

            {step === "personal" && <EditPersonalInfoForm />}
            {step === "about" && <EditAboutForm />}
            {step === "skills" && <EditSkillsForm />}

            <button
                type="button"
                onClick={() => {
                    if (step === "personal") setStep("about");
                    if (step === "about") setStep("skills");
                }}
            >
                Далее
            </button>
        </div>
    );
};