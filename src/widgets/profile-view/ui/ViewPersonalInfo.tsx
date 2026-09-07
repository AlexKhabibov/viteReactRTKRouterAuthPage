import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import type { Profile } from "@/features/get-profile/api/profileApi";
import type { Specializations } from "@/features/get-specializations/api/specializationsApi";

interface ViewPersonalInfoProps {
    profile: Profile;
    specialization?: Specializations["data"][number];
}

export const ViewPersonalInfo = ({
    profile,
    specialization,
}: ViewPersonalInfoProps) => {
    const email = useSelector((state: RootState) => state.user.email);
    const phone = useSelector((state: RootState) => state.user.phone);

    const specialistLevel = useSelector(
        (state: RootState) => state.profile.specialistLevel
    );

    const socialNetworks = useSelector(
        (state: RootState) => state.profile.socialNetworks
    );

    return (
        <section>
            <h2>Личная информация</h2>

            <div>
                <span>Имя пользователя</span>
                <span>{profile.username}</span>
            </div>

            <div>
                <span>Email</span>
                <span>{email || profile.email}</span>
            </div>

            <div>
                <span>Специализация</span>
                <span>{specialization?.title ?? "Не указана"}</span>
            </div>

            <div>
                <span>Уровень специалиста</span>
                <span>{specialistLevel || "Не указан"}</span>
            </div>

            <div>
                <span>Телефон</span>
                <span>{phone || profile.phone}</span>
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

            <div>
                <span>Социальные сети</span>

                {socialNetworks.vk && (
                    <div>VK: {socialNetworks.vk}</div>
                )}

                {socialNetworks.instagram && (
                    <div>Instagram: {socialNetworks.instagram}</div>
                )}

                {socialNetworks.facebook && (
                    <div>Facebook: {socialNetworks.facebook}</div>
                )}

                {socialNetworks.linkedin && (
                    <div>LinkedIn: {socialNetworks.linkedin}</div>
                )}

                {socialNetworks.telegram && (
                    <div>Telegram: {socialNetworks.telegram}</div>
                )}

                {socialNetworks.github && (
                    <div>GitHub: {socialNetworks.github}</div>
                )}

                {socialNetworks.whatsapp && (
                    <div>WhatsApp: {socialNetworks.whatsapp}</div>
                )}

                {!Object.values(socialNetworks).some(Boolean) && (
                    <div>Не указаны</div>
                )}
            </div>
        </section>
    );
};