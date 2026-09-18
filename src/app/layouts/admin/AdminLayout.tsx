import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminSidebar } from "@/widgets/admin-sidebar";
import { Header } from "@/widgets/header";

import styles from "./AdminLayout.module.css";

export function AdminLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] =
        useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className={styles.layout}>
            <Header
                isSidebarCollapsed={isSidebarCollapsed}
                onToggleSidebar={handleToggleSidebar}
            />

            <div className={styles.body}>
                <AdminSidebar
                    isCollapsed={isSidebarCollapsed}
                />

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}