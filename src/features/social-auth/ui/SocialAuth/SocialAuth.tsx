import styles from "./SocialAuth.module.css";

export function SocialAuth() {
    return (
        <div className={styles.container}>
            <p>Зарегистрироваться через социальные сети</p>

            <div className={styles.buttons}>
                <button type="button">➤</button>
                <button type="button">G</button>
                <button type="button">f</button>
            </div>
        </div>
    );
}