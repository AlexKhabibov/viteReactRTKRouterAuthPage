import { baseApi } from "@/shared/api/baseApi";

export interface SocialNetwork {
    code: string;
    title: string;
}

export interface UpdateProfileRequest {
    userId: string;
    specializationId: number;
    markingWeight: number;
    description: string;
    image_src: string;
    profileSkills: string[];
    socialNetwork: SocialNetwork[];
}

export type ProfileChanges = Partial<
    Pick<
        UpdateProfileRequest,
        | "specializationId"
        | "markingWeight"
        | "description"
        | "image_src"
        | "profileSkills"
    >
>;

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
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useUpdateProfileMutation } = updateProfileApi;