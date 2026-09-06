import type { Profile } from "@/features/get-profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { ViewPersonalInfo } from "./ViewPersonalInfo";
import { ViewAbout } from "./ViewAbout";
import { ViewSkills } from "./ViewSkills";
import { useNavigate } from "react-router-dom";

interface ProfileViewProps {
    profile: Profile;
}

export const ProfileView = ({ profile }: ProfileViewProps) => {
    const navigate = useNavigate();

    const { data: specializations } = useGetSpecializationsQuery();

    const professionalProfile = profile.profiles[0];

    const specialization = specializations?.data.find(
        (item) => item.id === professionalProfile.specializationId
    );

    function handleClick() {
        navigate('/dashboard/profile/edit')
    }

    return (
        <div>
            <h1>Мой профиль</h1>

            <ViewPersonalInfo
                profile={profile}
                specialization={specialization}
            />

            <ViewAbout profile={profile} />

            <ViewSkills profile={profile} />

            <button onClick={handleClick}>Редактировать профиль</button>
        </div>
    );
};