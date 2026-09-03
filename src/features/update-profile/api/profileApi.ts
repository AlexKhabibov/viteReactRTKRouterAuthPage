import { baseApi } from "@/shared/api/baseApi";

interface SocialNetwork {
    code: string;
    title: string;
}

interface UpdateProfileRequest {
    userId: string;
    markingWeight: number;
    description: string;
    socialNetwork: SocialNetwork[];
    image_src: string;
    profileSkills: string[];
}

export const updateProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation<
            void,
            {
                id: string;
                data: UpdateProfileRequest;
            }
        >({
            query: ({ id, data }) => ({
                url: `/profiles/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useUpdateProfileMutation } = updateProfileApi;