import YeahubWhite from "@/shared/ui/assets/YeahubWhite.png";
import styles from "./AuthLayout.module.css";

export function AuthPromo() {
    return (
        <aside className={styles.promo}>
            <div className={styles.promoTop}>
                <img
                    className={styles.logo}
                    src={YeahubWhite}
                    alt="Yeahub"
                />

                <p className={styles.subtitle}>
                    YeaHub объединяет IT-специалистов
                </p>
            </div>

            <div className={styles.promoBottom}>
                <h2>
                    Стань частью сообщества
                    <br />
                    YeaHub и получи:
                </h2>

                <ul>
                    <li>Пошаговый план обучения</li>
                    <li>Карьерный рост</li>
                    <li>Большое сообщество специалистов</li>
                    <li>Обучение с ментором</li>
                    <li>Возможность прохождения стажировки</li>
                </ul>
            </div>
        </aside>
    );
}