import { useState } from "react";
import type { Profile } from "@/features/get-profile/api/profileApi";
import styles from "./ViewAbout.module.css";

interface ViewAboutProps {
    profile: Profile;
}

export const ViewAbout = ({ profile }: ViewAboutProps) => {
    const description = profile.profiles[0]?.description ?? "";
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h2 className={styles.title}>Обо мне</h2>
            </div>

            <p
                className={`${styles.description} ${!isExpanded ? styles.collapsed : ""
                    }`}
            >
                {description || "Информация пока не заполнена."}
            </p>

            {description && (
                <button
                    type="button"
                    className={styles.expandButton}
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    {isExpanded ? "Свернуть" : "Развернуть"}

                    <span
                        className={
                            isExpanded ? styles.arrowUp : ""
                        }
                    >
                        ⌄
                    </span>
                </button>
            )}
        </section>
    );
};