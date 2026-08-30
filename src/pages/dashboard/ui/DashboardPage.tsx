import { useGetProfileQuery } from "@/features/profile";

export function DashboardPage() {
    const { data, isLoading, error } = useGetProfileQuery();

    if (isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (error) {
        return <h1>Ошибка загрузки профиля</h1>;
    }

    return (
        <>
            <h1>Dashboard</h1>

            <p>{data?.username}</p>
            <p>{data?.email}</p>
        </>
    );
}