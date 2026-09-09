import styles from "./ProfileCompletion.module.css";

interface ProfileCompletionProps {
    percentage: number;
    onEdit: () => void;
}

export const ProfileCompletion = ({
    percentage,
    onEdit,
}: ProfileCompletionProps) => {
    return (
        <section className={styles.card}>
            <div className={styles.info}>
                <span className={styles.label}>Профиль заполнен на</span>

                <span className={styles.percentage}>
                    {percentage}%
                </span>
            </div>

            <div className={styles.progress}>
                <div
                    className={styles.progressValue}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <button
                className={styles.button}
                type="button"
                onClick={onEdit}
            >
                Редактировать профиль
            </button>
        </section>
    );
};