import type { Profile } from "@/features/get-profile/api/profileApi";
import styles from "./ViewAbout.module.css";

interface ViewAboutProps {
    profile: Profile;
}

export const ViewAbout = ({ profile }: ViewAboutProps) => {
    const description = profile.profiles[0]?.description ?? "";

    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>Обо мне</h2>
            </div>

            <p className={styles.description}>
                {description || "Информация пока не заполнена."}
            </p>

            {description && (
                <button
                    type="button"
                    className={styles.expandButton}
                >
                    Развернуть
                    <span>⌄</span>
                </button>
            )}
        </section>
    );
};