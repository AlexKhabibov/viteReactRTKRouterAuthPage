import type { ReactNode } from "react";
import { AuthPromo } from "./AuthPromo";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className={styles.layout}>
            <AuthPromo />

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}