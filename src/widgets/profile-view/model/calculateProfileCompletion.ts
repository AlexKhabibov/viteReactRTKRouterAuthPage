import type { Profile } from "@/features/get-profile/api/profileApi";
import type { RootState } from "@/app/store/store";

export const calculateProfileCompletion = (
    profile: Profile,
    state: RootState
) => {
    const professionalProfile = profile.profiles[0];
    const socialNetworks = state.profile.socialNetworks;

    const fields = [
        profile.username,
        profile.avatarUrl,
        state.user.email || profile.email,
        state.user.phone || profile.phone,
        profile.country,
        profile.city,
        profile.birthday,
        profile.address,
        professionalProfile?.specializationId,
        state.profile.specialistLevel,
        professionalProfile?.description,
        professionalProfile?.profileSkills?.length,
        socialNetworks.vk,
        socialNetworks.instagram,
        socialNetworks.facebook,
        socialNetworks.linkedin,
        socialNetworks.telegram,
        socialNetworks.github,
        socialNetworks.whatsapp,
    ];

    const completedFields = fields.filter(Boolean).length;

    return Math.round((completedFields / fields.length) * 100);
};