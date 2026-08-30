import { useGetProfileQuery } from "@/features/profile";

import styles from "./Header.module.css";

interface HeaderProps {
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}

export function Header({
    onToggleSidebar,
}: HeaderProps) {
    const { data } = useGetProfileQuery();

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    Logo
                </div>

                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={onToggleSidebar}
                >
                    ☰
                </button>
            </div>

            <div className={styles.right}>
                <button
                    type="button"
                    className={styles.settingsButton}
                    aria-label="Настройки"
                >
                    ⚙️
                </button>

                <button
                    type="button"
                    className={styles.profileButton}
                    aria-label="Профиль"
                >
                    {data?.avatarUrl ? (
                        <img
                            className={styles.avatar}
                            src={data.avatarUrl}
                            alt={data.username}
                        />
                    ) : (
                        <span>👤</span>
                    )}
                </button>
            </div>
        </header>
    );
}