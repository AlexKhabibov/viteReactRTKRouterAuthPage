import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Footer } from "@/widgets/footer";

import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className={styles.layout}>
            <Header
                isSidebarCollapsed={isSidebarCollapsed}
                onToggleSidebar={() =>
                    setIsSidebarCollapsed((prev) => !prev)
                }
            />

            <div className={styles.content}>
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                />

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}