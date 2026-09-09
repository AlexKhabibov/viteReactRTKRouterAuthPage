import styles from "./ProfileTabs.module.css";

interface ProfileTabsProps {
    activeTab: number;
    onChange: (tab: number) => void;
}

const tabs = [
    "Личная информация",
    "Обо мне",
    "Навыки",
    "Проекты",
    "Опыт работы",
    "Образование",
];

export const ProfileTabs = ({
    activeTab,
    onChange,
}: ProfileTabsProps) => {
    return (
        <nav className={styles.tabs}>
            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(index)}
                    disabled={index > 2}
                    className={`${styles.tab} ${activeTab === index
                            ? styles.active
                            : ""
                        }`}
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
};