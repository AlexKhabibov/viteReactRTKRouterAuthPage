import type { Profile } from "@/features/get-profile/api/profileApi";

interface ViewAboutProps {
    profile: Profile;
}

export const ViewAbout = ({ profile }: ViewAboutProps) => {
    const professionalProfile = profile.profiles[0];

    return (
        <section>
            <h2>Обо мне</h2>

            <p>{professionalProfile.description}</p>
        </section>
    );
};