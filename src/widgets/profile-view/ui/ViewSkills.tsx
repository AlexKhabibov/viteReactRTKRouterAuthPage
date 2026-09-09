import type { Profile } from "@/features/get-profile/api/profileApi";
import styles from "./ViewSkills.module.css";

interface ViewSkillsProps {
    profile: Profile;
}

export const ViewSkills = ({ profile }: ViewSkillsProps) => {
    const skills = profile.profiles[0]?.profileSkills ?? [];

    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>Навыки</h2>
            </div>

            <div className={styles.skills}>
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <span
                            key={skill.id}
                            className={styles.skill}
                        >
                            {skill.title}
                        </span>
                    ))
                ) : (
                    <span className={styles.empty}>
                        Навыки пока не добавлены
                    </span>
                )}
            </div>
        </section>
    );
};