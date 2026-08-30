import { useGetProfileQuery } from "@/features/profile";
import { AboutMe } from "@/widgets/about-me/ui/AboutMe/AboutMe";
import { ProfileInfo } from "@/widgets/profile-info";

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
        <div>
            <h1>Мой профиль</h1>

            <ProfileInfo profile={data} />

            <AboutMe />
        </div>
    );
}