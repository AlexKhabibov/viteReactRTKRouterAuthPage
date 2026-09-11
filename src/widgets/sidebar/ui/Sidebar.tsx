import { NavLink } from "react-router-dom";
import { LogoutButton } from "@/features/logout";
import styles from "./Sidebar.module.css";

import MaimMenuIcon from "@/shared/ui/assets/icons/home.svg";
import UserMenuIcon from "@/shared/ui/assets/icons/user.svg";
import EducationMenuIcon from "@/shared/ui/assets/icons/book.svg";
import BlogMenuIcon from "@/shared/ui/assets/icons/bookOpen.svg";
import MentorsMenuIcon from "@/shared/ui/assets/icons/messageSend.svg";
import BaseMenuIcon from "@/shared/ui/assets/icons/listTasks.svg";
import AnaliticsMenuIcon from "@/shared/ui/assets/icons/pieChart.svg";


interface SidebarProps {
    isCollapsed: boolean;
}

const navigationItems = [
    {
        label: "Главная",
        icon: MaimMenuIcon,
        path: "/dashboard",
    },
    {
        label: "Мой профиль",
        icon: UserMenuIcon,
        path: "/dashboard/profile",
    },
    {
        label: "Обучение",
        icon: EducationMenuIcon,
        path: "/education",
        hasArrow: true,
    },
    {
        label: "Блог",
        icon: BlogMenuIcon,
        path: "/blog",
        hasArrow: true,
    },
    {
        label: "Менторы",
        icon: MentorsMenuIcon,
        path: "/mentors",
        hasArrow: true,
    },
    {
        label: "База знаний",
        icon: BaseMenuIcon,
        path: "/knowledge-base",
        hasArrow: true,
    },
    {
        label: "Аналитика",
        icon: AnaliticsMenuIcon,
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
                                    <img
                                        src={item.icon}
                                        alt=""
                                    />
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
                    <LogoutButton
                        isCollapsed={isCollapsed}
                    />
                </div>
            </div>
        </aside>
    );
}