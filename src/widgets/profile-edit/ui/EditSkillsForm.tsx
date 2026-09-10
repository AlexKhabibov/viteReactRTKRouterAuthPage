import { useState } from "react";

import type { Profile } from "@/features/get-profile/api/profileApi";
import { useGetSkillsQuery } from "@/features/get-skills";
import { useUpdateProfileMutation } from "@/features/update-profile";

import styles from "./EditSkillsForm.module.css";

interface EditSkillsFormProps {
    profile: Profile;
}

export const EditSkillsForm = ({
    profile,
}: EditSkillsFormProps) => {
    const { data: skills, isLoading } = useGetSkillsQuery();

    const [updateProfile, { isLoading: isSaving }] =
        useUpdateProfileMutation();

    const professionalProfile = profile.profiles[0];

    const [selectedSkills, setSelectedSkills] = useState<string[]>(
        professionalProfile?.profileSkills.map(
            (skill) => String(skill.id)
        ) ?? []
    );

    if (!professionalProfile) {
        return (
            <div className={styles.message}>
                Профессиональный профиль не найден
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.message}>
                Загрузка навыков...
            </div>
        );
    }

    const handleAddSkill = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const skillId = event.target.value;

        if (!skillId) {
            return;
        }

        setSelectedSkills((prev) => {
            if (prev.includes(skillId)) {
                return prev;
            }

            return [...prev, skillId];
        });

        event.target.value = "";
    };

    const handleRemoveSkill = (skillId: string) => {
        setSelectedSkills((prev) =>
            prev.filter((id) => id !== skillId)
        );
    };

    const handleSave = async () => {
        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,
                specializationId:
                    professionalProfile.specializationId,
                markingWeight:
                    professionalProfile.markingWeight,
                description:
                    professionalProfile.description,
                socialNetwork: [],
                image_src:
                    professionalProfile.image_src,
                profileSkills: selectedSkills,
            },
        }).unwrap();
    };

    const selectedSkillObjects = selectedSkills
        .map((skillId) =>
            skills?.data.find(
                (skill) => String(skill.id) === skillId
            )
        )
        .filter(Boolean);

    const availableSkills = skills?.data.filter(
        (skill) =>
            !selectedSkills.includes(String(skill.id))
    );

    return (
        <div className={styles.form}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h2 className={styles.title}>
                        Твои навыки
                    </h2>

                    <p className={styles.description}>
                        Покажи что ты умеешь
                        <br />
                        и в чём ты действительно хорошо
                    </p>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label
                            className={styles.label}
                            htmlFor="skill"
                        >
                            Навык
                        </label>

                        <div className={styles.selectWrapper}>
                            <select
                                id="skill"
                                className={styles.select}
                                defaultValue=""
                                onChange={handleAddSkill}
                            >
                                <option value="" disabled>
                                    Выбери навык из списка
                                </option>

                                {availableSkills?.map(
                                    (skill) => (
                                        <option
                                            key={skill.id}
                                            value={skill.id}
                                        >
                                            {skill.title}
                                        </option>
                                    )
                                )}
                            </select>

                            <span className={styles.chevron}>
                                ⌄
                            </span>
                        </div>
                    </div>

                    <div className={styles.selectedBlock}>
                        <span className={styles.selectedTitle}>
                            Выбранные навыки
                        </span>

                        <div className={styles.selected}>
                            {selectedSkillObjects.map(
                                (skill) => {
                                    if (!skill) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            className={
                                                styles.skill
                                            }
                                            key={skill.id}
                                        >
                                            <span
                                                className={
                                                    styles.skillIcon
                                                }
                                            >
                                                ◆
                                            </span>

                                            <span
                                                className={
                                                    styles.skillName
                                                }
                                            >
                                                {skill.title}
                                            </span>

                                            <button
                                                type="button"
                                                className={
                                                    styles.removeButton
                                                }
                                                onClick={() =>
                                                    handleRemoveSkill(
                                                        String(
                                                            skill.id
                                                        )
                                                    )
                                                }
                                                aria-label={`Удалить ${skill.title}`}
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
                    type="button"
                    className={styles.saveButton}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving
                        ? "Сохранение..."
                        : "Сохранить"}
                </button>
            </div>
        </div>
    );
};