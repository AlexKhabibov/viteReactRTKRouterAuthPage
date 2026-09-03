import type { Profile } from "@/features/get-profile/api/profileApi";
import type { Specializations } from "@/features/get-specializations/api/specializationsApi";

interface ViewPersonalInfoProps {
    profile: Profile;
    specialization?: Specializations["data"][number];
}

export const ViewPersonalInfo = ({ profile, specialization }: ViewPersonalInfoProps) => {
    return (
        <section>
            <h2>Личная информация</h2>

            <div>
                <span>Имя пользователя</span>
                <span>{profile.username}</span>
            </div>

            <div>
                <span>Email</span>
                <span>{profile.email}</span>
            </div>

            <div>
                <span>Специализация</span>
                <span>{specialization?.title ?? "Не указана"}</span>
            </div>

            <div>
                <span>Телефон</span>
                <span>{profile.phone}</span>
            </div>

            <div>
                <span>Страна</span>
                <span>{profile.country}</span>
            </div>

            <div>
                <span>Город</span>
                <span>{profile.city}</span>
            </div>

            <div>
                <span>Адрес</span>
                <span>{profile.address}</span>
            </div>

            <div>
                <span>Дата рождения</span>
                <span>{profile.birthday}</span>
            </div>
        </section>
    );
};