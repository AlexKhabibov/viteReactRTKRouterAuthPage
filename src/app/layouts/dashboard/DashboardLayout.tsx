import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Footer } from "@/widgets/footer";

import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] =
        useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const handleToggleMenu = () => {
        if (
            window.matchMedia("(max-width: 768px)").matches
        ) {
            setIsMobileMenuOpen((prev) => !prev);
            return;
        }

        setIsSidebarCollapsed((prev) => !prev);
    };

    const handleCloseMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className={styles.layout}>
            <Header
                isSidebarCollapsed={isSidebarCollapsed}
                onToggleSidebar={handleToggleMenu}
            />

            <div className={styles.content}>
                <div
                    className={`${styles.sidebarWrapper} ${isMobileMenuOpen
                            ? styles.sidebarWrapperOpen
                            : ""
                        }`}
                >
                    <Sidebar
                        isCollapsed={
                            isMobileMenuOpen
                                ? false
                                : isSidebarCollapsed
                        }
                    />
                </div>

                {isMobileMenuOpen && (
                    <button
                        type="button"
                        className={styles.overlay}
                        onClick={handleCloseMobileMenu}
                        aria-label="Закрыть меню"
                    />
                )}

                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}