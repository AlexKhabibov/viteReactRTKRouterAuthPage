import styles from "./AboutMe.module.css";

export function AboutMe() {
    return (
        <section className={styles.about}>
            <div className={styles.header}>
                <h2>Обо мне</h2>

                <button
                    type="button"
                    className={styles.editButton}
                >
                    Редактировать
                </button>
            </div>

            <p className={styles.text}>
                Информация о пользователе пока отсутствует.
            </p>
        </section>
    );
}