import type { Profile } from "@/features/get-profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { ViewPersonalInfo } from "./ViewPersonalInfo";
import { ViewAbout } from "./ViewAbout";
import { ViewSkills } from "./ViewSkills";

interface ProfileViewProps {
    profile: Profile;
}

export const ProfileView = ({ profile }: ProfileViewProps) => {
    const { data: specializations } = useGetSpecializationsQuery();

    const professionalProfile = profile.profiles[0];

    const specialization = specializations?.data.find(
        (item) => item.id === professionalProfile.specializationId
    );

    return (
        <div>
            <h1>Мой профиль</h1>

            <ViewPersonalInfo
                profile={profile}
                specialization={specialization}
            />

            <ViewAbout profile={profile} />

            <ViewSkills profile={profile} />
        </div>
    );
};