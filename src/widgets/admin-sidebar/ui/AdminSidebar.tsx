import { NavLink } from "react-router-dom";

import styles from "./AdminSidebar.module.css";

interface AdminSidebarProps {
    isCollapsed: boolean;
}

const navigationItems = [
    {
        label: "Платформа",
        path: "/admin",
    },
    {
        label: "Главная",
        path: "/admin",
    },
    {
        label: "Специализации",
        path: "/admin/specializations",
    },
    {
        label: "Верификация",
        path: "/admin/verification",
    },
    {
        label: "Навыки",
        path: "/admin/skills",
    },
    {
        label: "Вопросы",
        path: "/admin/questions",
    },
    {
        label: "Мероприятия",
        path: "/admin/events",
    },
    {
        label: "RoadMap",
        path: "/admin/roadmap",
    },
    {
        label: "Пользователь",
        path: "/admin/user",
    },
    {
        label: "Коллекции",
        path: "/admin/collections",
    },
    {
        label: "Компания",
        path: "/admin/company",
    },
    {
        label: "Ресурсы",
        path: "/admin/resources",
    },
    {
        label: "Темы",
        path: "/admin/topics",
    },
    {
        label: "Лайвкодинг",
        path: "/admin/live-coding",
    },
    {
        label: "Реферальная система",
        path: "/admin/referrals",
    },
];

export function AdminSidebar({
    isCollapsed,
}: AdminSidebarProps) {
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
                                    `${styles.link} ${isActive
                                        ? styles.active
                                        : ""
                                    }`
                                }
                            >
                                {!isCollapsed && (
                                    <span
                                        className={styles.label}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}