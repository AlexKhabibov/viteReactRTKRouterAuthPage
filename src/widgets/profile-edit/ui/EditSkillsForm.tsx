import {
    useEffect,
    useState,
} from "react";
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

interface SelectedSkill {
    id: number;
    title: string;
}

export const EditSkillsForm = ({
    profile,
    onSubmit,
    onSuccess,
    isSaving,
}: EditSkillsFormProps) => {
    const professionalProfile =
        profile.profiles[0];

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    const [
        selectedSkills,
        setSelectedSkills,
    ] = useState<SelectedSkill[]>(
        professionalProfile?.profileSkills.map(
            (skill) => ({
                id: skill.id,
                title: skill.title,
            })
        ) ?? []
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    const {
        data: skills,
        isLoading,
    } = useGetSkillsQuery({
        page: 1,
        limit: 100,
        title: debouncedSearch || undefined,
    });

    const handleSelectSkill = (
        skillId: string
    ) => {
        if (!skillId) {
            return;
        }

        const skill = skills?.data.find(
            (item) =>
                String(item.id) === skillId
        );

        if (!skill) {
            return;
        }

        const alreadySelected =
            selectedSkills.some(
                (item) => item.id === skill.id
            );

        if (alreadySelected) {
            return;
        }

        setSelectedSkills((prev) => [
            ...prev,
            {
                id: skill.id,
                title: skill.title,
            },
        ]);
    };

    const handleRemoveSkill = (
        skillId: number
    ) => {
        setSelectedSkills((prev) =>
            prev.filter(
                (skill) => skill.id !== skillId
            )
        );
    };

    const handleSave = async () => {
        try {
            await onSubmit({
                profileSkills:
                    selectedSkills.map((skill) =>
                        String(skill.id)
                    ),
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

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Поиск навыка"
                        />

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
                                onChange={(event) =>
                                    handleSelectSkill(
                                        event.target
                                            .value
                                    )
                                }
                            >
                                <option value="">
                                    Выберите навык
                                </option>

                                {skills?.data.map(
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
                                (skill) => (
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
                                                handleRemoveSkill(
                                                    skill.id
                                                )
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
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