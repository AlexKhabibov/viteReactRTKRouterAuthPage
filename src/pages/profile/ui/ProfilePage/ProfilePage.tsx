import { useGetProfileQuery } from "@/features/profile";
import { AboutMe } from "@/widgets/about-me";
import { ProfileInfo } from "@/widgets/profile-info";
import { ProfileSkills } from "@/widgets/profile-skills";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
    const { data, isLoading, error } = useGetProfileQuery();

    if (isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (error) {
        return <h1>Ошибка загрузки профиля</h1>;
    }

    if (!data) {
        return null;
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Мой профиль</h1>

            <ProfileInfo profile={data} />

            <AboutMe />

            <ProfileSkills />
        </div>
    );
}