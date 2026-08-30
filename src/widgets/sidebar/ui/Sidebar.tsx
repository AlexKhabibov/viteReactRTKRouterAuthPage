import { NavLink } from "react-router-dom";

import { LogoutButton } from "@/features/logout";

import styles from "./Sidebar.module.css";

interface SidebarProps {
    isCollapsed: boolean;
}

const navigationItems = [
    { label: "Главная", icon: "🏠", path: "/dashboard" },
    { label: "Мой профиль", icon: "👤", path: "/profile" },
    { label: "Обучение", icon: "📚", path: "/education" },
    { label: "Блог", icon: "📝", path: "/blog" },
    { label: "Менторы", icon: "👥", path: "/mentors" },
    { label: "База знаний", icon: "📖", path: "/knowledge-base" },
    { label: "Аналитика", icon: "📊", path: "/analytics" },
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
                                    <span>{item.label}</span>
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
                    <span className={styles.icon}>💬</span>

                    {!isCollapsed && "Поддержка"}
                </button>

                <div className={styles.logout}>
                    <LogoutButton isCollapsed={isCollapsed} />
                </div>
            </div>
        </aside>
    );
}