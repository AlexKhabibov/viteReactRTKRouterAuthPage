import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import type { ProfileChanges } from "@/features/update-profile/api/profileApi";
import styles from "./EditAboutForm.module.css";

interface EditAboutFormProps {
    profile: Profile;
    onSubmit: (
        changes: ProfileChanges
    ) => Promise<void>;
    onSuccess: () => void;
    isSaving: boolean;
}

export const EditAboutForm = ({
    profile,
    onSubmit,
    onSuccess,
    isSaving,
}: EditAboutFormProps) => {
    const professionalProfile =
        profile.profiles[0];

    const [description, setDescription] =
        useState(
            professionalProfile?.description ?? ""
        );

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            await onSubmit({
                description,
            });

            onSuccess();
        } catch (error) {
            console.error(
                "Ошибка сохранения описания:",
                error
            );
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <h2 className={styles.title}>
                Расскажите о себе
            </h2>

            <textarea
                className={styles.textarea}
                value={description}
                onChange={(event) =>
                    setDescription(
                        event.target.value
                    )
                }
                placeholder="Расскажите о себе"
            />

            <div className={styles.submitRow}>
                <button
                    className={styles.saveButton}
                    type="submit"
                    disabled={isSaving}
                >
                    {isSaving
                        ? "Сохранение..."
                        : "Далее"}

                    {!isSaving && (
                        <span>→</span>
                    )}
                </button>
            </div>
        </form>
    );
};