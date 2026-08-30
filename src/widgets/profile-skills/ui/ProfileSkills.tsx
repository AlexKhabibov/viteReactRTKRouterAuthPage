import styles from "./ProfileSkills.module.css";

const skills = [
    "Figma",
    "Wireframing",
    "Prototyping",
];

export function ProfileSkills() {
    return (
        <section className={styles.skills}>
            <h2>Навыки</h2>

            <div className={styles.list}>
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className={styles.skill}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}