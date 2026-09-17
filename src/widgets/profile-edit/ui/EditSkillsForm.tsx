import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import type { ProfileChanges } from "@/features/update-profile/api/profileApi";
import { useGetSkillsQuery } from "@/features/get-skills";
import styles from "./EditSkillsForm.module.css";

interface EditSkillsFormProps {
    profile: Profile;
    onSubmit: (
        changes: ProfileChanges
    ) => Promise<void>;
    onSuccess: () => void;
    isSaving: boolean;
}

export const EditSkillsForm = ({
    profile,
    onSubmit,
    onSuccess,
    isSaving,
}: EditSkillsFormProps) => {
    const professionalProfile =
        profile.profiles[0];

    const {
        data: skills,
        isLoading,
    } = useGetSkillsQuery();

    const [
        selectedSkills,
        setSelectedSkills,
    ] = useState<string[]>(
        professionalProfile?.profileSkills.map(
            (skill) => String(skill.id)
        ) ?? []
    );

    const handleSave = async () => {
        try {
            await onSubmit({
                profileSkills: selectedSkills,
            });

            onSuccess();
        } catch (error) {
            console.error(
                "Ошибка сохранения навыков:",
                error
            );
        }
    };

    if (isLoading) {
        return (
            <div className={styles.message}>
                Загрузка навыков...
            </div>
        );
    }

    return (
        <div className={styles.form}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h2 className={styles.title}>
                        Навыки
                    </h2>

                    <p
                        className={
                            styles.description
                        }
                    >
                        Выберите навыки, которыми
                        вы владеете
                    </p>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label
                            className={
                                styles.label
                            }
                        >
                            Добавить навык
                        </label>

                        <div
                            className={
                                styles.selectWrapper
                            }
                        >
                            <select
                                className={
                                    styles.select
                                }
                                value=""
                                onChange={(
                                    event
                                ) => {
                                    const skillId =
                                        event.target
                                            .value;

                                    if (
                                        !skillId ||
                                        selectedSkills.includes(
                                            skillId
                                        )
                                    ) {
                                        return;
                                    }

                                    setSelectedSkills(
                                        (prev) => [
                                            ...prev,
                                            skillId,
                                        ]
                                    );
                                }}
                            >
                                <option value="">
                                    Выберите навык
                                </option>

                                {skills?.data?.map(
                                    (skill) => (
                                        <option
                                            key={
                                                skill.id
                                            }
                                            value={String(
                                                skill.id
                                            )}
                                        >
                                            {
                                                skill.title
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <span
                                className={
                                    styles.chevron
                                }
                            >
                                ▾
                            </span>
                        </div>
                    </div>

                    <div
                        className={
                            styles.selectedBlock
                        }
                    >
                        <span
                            className={
                                styles.selectedTitle
                            }
                        >
                            Выбранные навыки
                        </span>

                        <div
                            className={
                                styles.selected
                            }
                        >
                            {selectedSkills.map(
                                (skillId) => {
                                    const skill =
                                        skills?.data?.find(
                                            (
                                                item
                                            ) =>
                                                String(
                                                    item.id
                                                ) ===
                                                skillId
                                        );

                                    if (!skill) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            className={
                                                styles.skill
                                            }
                                            key={
                                                skillId
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.skillIcon
                                                }
                                            >
                                                ✓
                                            </span>

                                            <span
                                                className={
                                                    styles.skillName
                                                }
                                            >
                                                {
                                                    skill.title
                                                }
                                            </span>

                                            <button
                                                className={
                                                    styles.removeButton
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedSkills(
                                                        (
                                                            prev
                                                        ) =>
                                                            prev.filter(
                                                                (
                                                                    id
                                                                ) =>
                                                                    id !==
                                                                    skillId
                                                            )
                                                    )
                                                }
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.saveRow}>
                <button
                    className={
                        styles.saveButton
                    }
                    type="button"
                    onClick={handleSave}
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
        </div>
    );
};