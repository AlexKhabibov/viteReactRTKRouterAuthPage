import { useGetProfileQuery } from "@/features/get-profile";

import YeahubMainLogo from "@/shared/ui/assets/logoPrimaryBlock.png";
import Settings from "@/shared/ui/assets/icons/gear.svg";
import Menu from "@/shared/ui/assets/icons/arrowInSquare.svg";

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
                <img
                    className={styles.logo}
                    src={YeahubMainLogo}
                    alt="Yeahub"
                />

                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={onToggleSidebar}
                    aria-label="Открыть меню"
                >
                    <img src={Menu} alt="" />
                </button>
            </div>

            <div className={styles.right}>
                <button
                    type="button"
                    className={styles.settingsButton}
                    aria-label="Настройки"
                >
                    <img src={Settings} alt="" />
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
                        <span
                            className={
                                styles.avatarPlaceholder
                            }
                        >
                            👤
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}