import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { ProfileTabs } from "./ProfileTabs";
import { EditPersonalInfoForm } from "./EditPersonalInfoForm";
import { EditAboutForm } from "./EditAboutForm";
import { EditSkillsForm } from "./EditSkillsForm";
import styles from "./ProfileEditor.module.css";

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
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Редактирование профиля
                </h1>

                <div className={styles.card}>
                    <ProfileTabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    <div className={styles.content}>
                        {activeTab === 0 && (
                            <EditPersonalInfoForm
                                profile={profile}
                            />
                        )}

                        {activeTab === 1 && (
                            <EditAboutForm
                                profile={profile}
                            />
                        )}

                        {activeTab === 2 && (
                            <EditSkillsForm
                                profile={profile}
                            />
                        )}
                    </div>

                    {activeTab < 2 && (
                        <div className={styles.footer}>
                            <button
                                className={styles.nextButton}
                                type="button"
                                onClick={handleNext}
                            >
                                Далее
                                <span>→</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};