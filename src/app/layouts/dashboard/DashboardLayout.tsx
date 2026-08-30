import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import styles from "./DashboardLayout.module.css";
import { Footer } from "@/widgets/footer";

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