import type { Profile } from "@/features/get-profile/api/profileApi";

interface ViewSkillsProps {
    profile: Profile;
}

export const ViewSkills = ({ profile }: ViewSkillsProps) => {
    const skills = profile.profiles[0].profileSkills;

    return (
        <section>
            <h2>Навыки</h2>

            {skills.map((skill) => (
                <span key={skill.id}>
                    {skill.title}
                </span>
            ))}
        </section>
    );
};