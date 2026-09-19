import { baseApi } from "@/shared/api/baseApi";

export interface Specializations {
    total: number;
    page: number;
    limit: number;
    data: {
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
}

interface GetSpecializationsParams {
    page?: number;
    limit?: number;
    title?: string;
}

export const specializationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<
            Specializations,
            GetSpecializationsParams
        >({
            query: ({
                page = 1,
                limit = 10,
                title,
            }) => ({
                url: "/specializations",
                method: "GET",
                params: {
                    page,
                    limit,
                    ...(title && { title }),
                },
            }),
        }),
    }),
});

export const {
    useGetSpecializationsQuery,
} = specializationsApi;