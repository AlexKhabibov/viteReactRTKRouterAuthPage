import { useGetProfileQuery } from "@/features/get-profile";
import { ProfileEditor } from "@/widgets/profile-edit";

export const ProfileEditPage = () => {
    const { data: profile, isLoading } = useGetProfileQuery();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!profile) {
        return <div>Профиль не найден</div>;
    }

    return <ProfileEditor profile={profile} />;
};