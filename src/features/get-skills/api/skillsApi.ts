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

interface GetSkillsParams {
    page?: number;
    limit?: number;
    title?: string;
    specializations?: number;
    authorId?: string;
}

export const skillsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<
            Skills,
            GetSkillsParams
        >({
            query: ({
                page = 1,
                limit = 10,
                title,
                specializations,
                authorId,
            }) => ({
                url: "/skills",
                method: "GET",
                params: {
                    page,
                    limit,
                    ...(title && { title }),
                    ...(specializations && {
                        specializations,
                    }),
                    ...(authorId && { authorId }),
                },
            }),
        }),
    }),
});

export const { useGetSkillsQuery } = skillsApi;