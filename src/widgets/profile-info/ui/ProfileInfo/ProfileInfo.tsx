import styles from "./ProfileInfo.module.css";

interface Profile {
    username: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    birthday: string;
    avatarUrl: string;
}

interface ProfileInfoProps {
    profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
    return (
        <section className={styles.profileInfo}>
            <div className={styles.avatar}>
                {profile.avatarUrl ? (
                    <img
                        src={profile.avatarUrl}
                        alt={profile.username}
                    />
                ) : (
                    <span>👤</span>
                )}
            </div>

            <div className={styles.info}>
                <h2>{profile.username}</h2>

                <p>{profile.email}</p>
                <p>{profile.phone}</p>
                <p>
                    {profile.city}, {profile.country}
                </p>
            </div>
        </section>
    );
}