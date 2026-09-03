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

export const specializationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSpecializations: builder.query<Specializations, void>({
            query: () => ({
                url: "/specializations",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetSpecializationsQuery } = specializationsApi;