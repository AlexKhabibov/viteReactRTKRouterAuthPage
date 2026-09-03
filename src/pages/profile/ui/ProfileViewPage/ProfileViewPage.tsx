import { useGetProfileQuery } from "@/features/get-profile";
import { ProfileView } from "@/widgets/profile-view";

export const ProfileViewPage = () => {
    const { data: profile, isLoading } = useGetProfileQuery();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!profile) {
        return <div>Профиль не найден</div>;
    }

    return <ProfileView profile={profile} />;
};