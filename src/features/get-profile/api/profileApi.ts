import { baseApi } from "@/shared/api/baseApi";

export interface Profile {
    id: string;
    username: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    birthday: string;
    address: string;
    avatarUrl: string;
    updatedAt: string;
    createdAt: string;

    userRoles: {
        id: number;
        name: string;
        permissions: {
            id: number;
            name: string;
        }[];
    }[];

    isVerified: boolean;
    isEmailNotificationsEnable: boolean;

    profiles: {
        id: string;
        userId: string;
        profileType: number;
        specializationId: number;
        markingWeight: number;
        description: string;
        image_src: string;
        isActive: boolean;
        ratingPoints: number;

        profileSkills: {
            id: number;
            title: string;
            description: string;
            imageSrc: string;
        }[];
    }[];
}

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, void>({
            query: () => ({
                url: "/auth/profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;