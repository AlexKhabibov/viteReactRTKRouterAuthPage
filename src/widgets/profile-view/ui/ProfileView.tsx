import type { Profile } from "@/features/get-profile/api/profileApi";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { ViewPersonalInfo } from "./ViewPersonalInfo";
import { ViewAbout } from "./ViewAbout";
import { ViewSkills } from "./ViewSkills";
import { ProfileCompletion } from "./ProfileCompletion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { calculateProfileCompletion } from "../model/calculateProfileCompletion";

interface ProfileViewProps {
    profile: Profile;
}

export const ProfileView = ({ profile }: ProfileViewProps) => {
    const navigate = useNavigate();

    const state = useSelector((state: RootState) => state);

    const { data: specializations } = useGetSpecializationsQuery();

    const professionalProfile = profile.profiles[0];

    const specialization = specializations?.data.find(
        (item) => item.id === professionalProfile.specializationId
    );

    const completion = calculateProfileCompletion(profile, state);

    function handleEdit() {
        navigate("/dashboard/profile/edit");
    }

    return (
        <div>
            <h1>Мой профиль</h1>

            <ProfileCompletion
                percentage={completion}
                onEdit={handleEdit}
            />

            <ViewPersonalInfo
                profile={profile}
                specialization={specialization}
            />

            <ViewAbout profile={profile} />

            <ViewSkills profile={profile} />
        </div>
    );
};