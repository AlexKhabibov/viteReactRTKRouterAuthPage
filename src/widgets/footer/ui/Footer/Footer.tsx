import SocialIcons from "@/shared/ui/assets/SocialIcons.png";
import YeahubWhite from "@/shared/ui/assets/YeahubWhite.png";

import styles from "./Footer.module.css";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.logo}>
                        <img src={YeahubWhite} alt="Yeahub" />
                    </div>

                    <div className={styles.footerMessage}>
                        <p className={styles.footerDescription}>
                            Выбери, каким будет IT завтра, вместе с нами
                        </p>

                        <p className={styles.footerText}>
                            YeaHub — это полностью открытый проект,
                            призванный объединить и улучшить IT-сферу.
                            Наш исходный код доступен для просмотра на
                            GitHub. Дизайн проекта также открыт для
                            ознакомления в Figma.
                        </p>
                    </div>
                </div>

                <div className={styles.footerCopyrightContainer}>
                    <div className={styles.footerCopyright}>
                        <div className={styles.copyright}>
                            <p>© {currentYear} YeaHub</p>
                            <p>Документы</p>

                            <img
                                src={SocialIcons}
                                alt="Социальные сети"
                            />
                        </div>

                        <div className={styles.social}>
                            Ищите нас и в других соцсетях @yeahub_it
                        </div>
                    </div>

                    <img
                        src={SocialIcons}
                        alt="Социальные сети"
                    />
                </div>
            </div>
        </footer>
    );
}