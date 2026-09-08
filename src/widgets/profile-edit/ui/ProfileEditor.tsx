import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { ProfileTabs } from "./ProfileTabs";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import { EditAboutForm } from "./EditAboutForm";
import { EditSkillsForm } from "./EditSkillsForm";

interface ProfileEditorProps {
    profile: Profile;
}

export const ProfileEditor = ({ profile }: ProfileEditorProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleNext = () => {
        if (activeTab < 2) {
            setActiveTab((prev) => prev + 1);
        }
    };

    return (
        <div>
            <ProfileTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === 0 && (
                <EditPersonalInfoForm profile={profile} />
            )}

            {activeTab === 1 && (
                <EditAboutForm profile={profile} />
            )}

            {activeTab === 2 && (
                <EditSkillsForm profile={profile} />
            )}

            {activeTab < 2 ? (
                <button type="button" onClick={handleNext}>
                    Далее
                </button>
            ) : null}
        </div>
    );
};