import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import {
    useUpdateProfileMutation,
    type ProfileChanges,
} from "@/features/update-profile/api/profileApi";
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

    const [updateProfile, { isLoading: isSaving }] =
        useUpdateProfileMutation();

    const professionalProfile = profile.profiles[0];

    const handleProfileUpdate = async (
        changes: ProfileChanges
    ) => {
        if (!professionalProfile) {
            return;
        }

        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,

                specializationId:
                    changes.specializationId ??
                    professionalProfile.specializationId,

                markingWeight:
                    changes.markingWeight ??
                    professionalProfile.markingWeight,

                description:
                    changes.description ??
                    professionalProfile.description,

                image_src:
                    changes.image_src ??
                    professionalProfile.image_src,

                profileSkills:
                    changes.profileSkills ??
                    professionalProfile.profileSkills.map(
                        (skill) => String(skill.id)
                    ),

                // Пока соцсети — заглушка.
                socialNetwork: [],
            },
        }).unwrap();
    };

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
                                onSubmit={handleProfileUpdate}
                                onSuccess={handleNext}
                                isSaving={isSaving}
                            />
                        )}

                        {activeTab === 1 && (
                            <EditAboutForm
                                profile={profile}
                                onSubmit={handleProfileUpdate}
                                onSuccess={handleNext}
                                isSaving={isSaving}
                            />
                        )}

                        {activeTab === 2 && (
                            <EditSkillsForm
                                profile={profile}
                                onSubmit={handleProfileUpdate}
                                onSuccess={handleNext}
                                isSaving={isSaving}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};