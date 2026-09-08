import type { Profile } from "@/features/get-profile/api/profileApi";
import type { RootState } from "@/app/store/store";

export const calculateProfileCompletion = (
    profile: Profile,
    state: RootState
) => {
    const professionalProfile = profile.profiles[0];

    const fields = [
        profile.username,
        profile.avatarUrl,
        state.user.email || profile.email,
        state.user.phone || profile.phone,
        profile.country,
        profile.city,
        profile.birthday,
        professionalProfile?.specializationId,
        state.profile.specialistLevel,
        professionalProfile?.description,
        professionalProfile?.profileSkills?.length,
    ];

    const completedFields = fields.filter(Boolean).length;

    return Math.round((completedFields / fields.length) * 100);
};