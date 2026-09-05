import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { useGetSkillsQuery } from "@/features/get-skills";
import { useUpdateProfileMutation } from "@/features/update-profile";

interface EditSkillsFormProps {
    profile: Profile;
}

export const EditSkillsForm = ({ profile }: EditSkillsFormProps) => {
    const { data: skills, isLoading } = useGetSkillsQuery();

    const [updateProfile, { isLoading: isSaving }] =
        useUpdateProfileMutation();

    const professionalProfile = profile.profiles[0];

    const [selectedSkills, setSelectedSkills] = useState<string[]>(
        professionalProfile?.profileSkills.map((skill) => String(skill.id)) ?? []
    );

    const handleSave = async () => {
        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,
                specializationId: professionalProfile.specializationId,
                markingWeight: professionalProfile.markingWeight,
                description: professionalProfile.description,
                socialNetwork: [],
                image_src: professionalProfile.image_src,
                profileSkills: selectedSkills,
            },
        }).unwrap();
    };

    if (!professionalProfile) {
        return <div>Профессиональный профиль не найден</div>;
    }

    if (isLoading) {
        return <div>Загрузка навыков...</div>;
    }

    const toggleSkill = (skillId: number) => {
        const id = String(skillId);

        setSelectedSkills((prev) => {
            if (prev.includes(id)) {
                return prev.filter((skillId) => skillId !== id);
            }

            return [...prev, id];
        });
    };

    return (
        <div>
            <h2>Навыки</h2>

            <div>
                <h3>Выбранные навыки</h3>

                {selectedSkills.map((skillId) => {
                    const skill = skills?.data.find(
                        (skill) => String(skill.id) === skillId
                    );

                    return (
                        <span key={skillId}>
                            {skill?.title}
                        </span>
                    );
                })}
            </div>

            <div>
                <h3>Добавить навык</h3>

                {skills?.data.map((skill) => (
                    <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                    >
                        {skill.title}
                    </button>
                ))}
            </div>

            <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
            >
                {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
        </div>
    );
};