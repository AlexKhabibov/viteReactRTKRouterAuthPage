import { useGetProfileQuery } from "@/features/profile";
import { Footer } from "@/widgets/footer";
import { Sidebar } from "@/widgets/sidebar";

export function DashboardPage() {
    const { data, isLoading, error } = useGetProfileQuery();

    return (
        <div className="dashboard">


            <Sidebar />

            <main className="dashboard__main">
                {isLoading && <h1>Загрузка...</h1>}

                {error && <h1>Ошибка загрузки профиля</h1>}

                {data && (
                    <>
                        <h1>Dashboard</h1>

                        <p>{data.username}</p>
                        <p>{data.email}</p>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}