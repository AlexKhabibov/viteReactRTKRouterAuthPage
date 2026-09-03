import { baseApi } from "@/shared/api/baseApi";

interface Skills {
    total: number;
    page: number;
    limit: number;
    data: {
        id: number;
        title: string;
        description: string;
        imageSrc: string;
        createdAt: string;
        updatedAt: string;
        specializations: {
            id: number;
            title: string;
            slug: string;
            description: string;
            imageSrc: string;
            createdAt: string;
            updatedAt: string;
            createdBy: {
                id: string;
                username: string;
            };
        }[];
        createdBy: {
            id: string;
            username: string;
        };
    }[];
}

export const skillsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<Skills, void>({
            query: () => ({
                url: "/skills",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetSkillsQuery } = skillsApi;