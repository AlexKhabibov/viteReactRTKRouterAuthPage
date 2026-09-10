import { NavLink } from "react-router-dom";
import { LogoutButton } from "@/features/logout";
import styles from "./Sidebar.module.css";

interface SidebarProps {
    isCollapsed: boolean;
}

const navigationItems = [
    {
        label: "Главная",
        icon: "⌂",
        path: "/dashboard",
    },
    {
        label: "Мой профиль",
        icon: "◉",
        path: "/dashboard/profile",
    },
    {
        label: "Обучение",
        icon: "▣",
        path: "/education",
        hasArrow: true,
    },
    {
        label: "Блог",
        icon: "▤",
        path: "/blog",
        hasArrow: true,
    },
    {
        label: "Менторы",
        icon: "♙",
        path: "/mentors",
        hasArrow: true,
    },
    {
        label: "База знаний",
        icon: "▥",
        path: "/knowledge-base",
        hasArrow: true,
    },
    {
        label: "Аналитика",
        icon: "◔",
        path: "/analytics",
    },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
    return (
        <aside
            className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""
                }`}
        >
            <nav className={styles.navigation}>
                <ul className={styles.navigationList}>
                    {navigationItems.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `${styles.link} ${isActive ? styles.active : ""
                                    }`
                                }
                            >
                                <span className={styles.icon}>
                                    {item.icon}
                                </span>

                                {!isCollapsed && (
                                    <span className={styles.label}>
                                        {item.label}
                                    </span>
                                )}

                                {!isCollapsed && item.hasArrow && (
                                    <span className={styles.arrow}>
                                        ⌄
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.actionButton}
                >
                    <span className={styles.icon}>?</span>

                    {!isCollapsed && (
                        <span className={styles.label}>
                            Поддержка
                        </span>
                    )}
                </button>

                <div className={styles.logout}>
                    <LogoutButton isCollapsed={isCollapsed} />
                </div>
            </div>
        </aside>
    );
}