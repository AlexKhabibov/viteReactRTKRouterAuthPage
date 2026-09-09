import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { useUpdateProfileMutation } from "@/features/update-profile";
import styles from './EditAboutForm.module.css'

interface EditAboutFormProps {
    profile: Profile;
}

export const EditAboutForm = ({ profile }: EditAboutFormProps) => {
    const professionalProfile = profile.profiles[0];

    const [description, setDescription] = useState(
        professionalProfile?.description ?? ""
    );

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!professionalProfile) {
            return;
        }

        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,
                specializationId: professionalProfile.specializationId,
                markingWeight: professionalProfile.markingWeight,
                description,
                socialNetwork: [],
                image_src: professionalProfile.image_src,
                profileSkills: professionalProfile.profileSkills.map(
                    (skill) => String(skill.id)
                ),
            },
        }).unwrap();
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h2 className={styles.title}>Обо мне</h2>

            <textarea
                className={styles.textarea}
                id="description"
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
            />

            <div className={styles.submitRow}>
                <button
                    className={styles.saveButton}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
            </div>
        </form>
    );
};