import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import type { Profile } from "@/features/get-profile/api/profileApi";
import type { Specializations } from "@/features/get-specializations/api/specializationsApi";
import styles from "./ViewPersonalInfo.module.css";

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

    const socials = Object.entries(socialNetworks).filter(
        ([, value]) => Boolean(value)
    );

    return (
        <section className={styles.card}>
            <div className={styles.avatarWrapper}>
                {profile.avatarUrl ? (
                    <img
                        className={styles.avatar}
                        src={profile.avatarUrl}
                        alt={profile.username}
                    />
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        Нет фото
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.nameRow}>
                    <h2 className={styles.name}>
                        {profile.username}
                    </h2>

                    <span className={styles.status}>
                        Кандидат
                    </span>
                </div>

                <div className={styles.specialization}>
                    {specialization?.title ?? "Специализация не указана"}
                </div>

                <div className={styles.details}>
                    {specialistLevel && (
                        <span>{specialistLevel}</span>
                    )}

                    {profile.country && (
                        <span>
                            {profile.city
                                ? `${profile.city}, ${profile.country}`
                                : profile.country}
                        </span>
                    )}
                </div>

                <div className={styles.contacts}>
                    {(phone || profile.phone) && (
                        <span>{phone || profile.phone}</span>
                    )}

                    {(email || profile.email) && (
                        <span>{email || profile.email}</span>
                    )}
                </div>

                {socials.length > 0 && (
                    <div className={styles.socials}>
                        {socials.map(([name, value]) => (
                            <a
                                key={name}
                                href={value}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.social}
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};