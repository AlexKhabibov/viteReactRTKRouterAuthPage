import { useForm } from "react-hook-form";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { useUpdateUserMutation } from "@/features/update-user";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { useUpdateProfileMutation } from "@/features/update-profile";

interface EditPersonalInfoFormProps {
    profile: Profile;
}

interface PersonalInfoForm {
    username: string;
    country: string;
    city: string;
    birthday: string;
    address: string;
    avatar: FileList;
    specializationId: number | undefined;
}

export const EditPersonalInfoForm = ({ profile }: EditPersonalInfoFormProps) => {

    const { data: specializations, isLoading: isSpecializationsLoading } =
        useGetSpecializationsQuery();

    const currentSpecializationId = profile.profiles[0]?.specializationId;

    const { register, handleSubmit } = useForm<PersonalInfoForm>({
        defaultValues: {
            username: profile.username ?? "",
            country: profile.country ?? "",
            city: profile.city ?? "",
            birthday: profile.birthday?.slice(0, 10) ?? "",
            address: profile.address ?? "",
            specializationId: currentSpecializationId,
        },
    });

    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [updateProfile, { isLoading: isProfileUpdating }] = useUpdateProfileMutation();

    const onSubmit = async (data: PersonalInfoForm) => {

        const professionalProfile = profile.profiles[0];

        if (!professionalProfile) return;
        if (data.specializationId === undefined) return;

        const file = data.avatar?.[0];

        let avatarImage: string | undefined;

        if (file) {
            avatarImage = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    const result = reader.result as string;
                    resolve(result.split(",")[1]);
                };

                reader.onerror = reject;

                reader.readAsDataURL(file);
            });
        }

        await updateUser({
            id: profile.id,
            data: {
                username: data.username,
                country: data.country,
                city: data.city || undefined,
                birthday: data.birthday || undefined,
                address: data.address,
                avatarImage,
            },
        }).unwrap();

        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,
                specializationId: data.specializationId,
                markingWeight: professionalProfile.markingWeight,
                description: professionalProfile.description,
                socialNetwork: [],
                image_src: professionalProfile.image_src,
                profileSkills: professionalProfile.profileSkills.map(
                    (skill) => String(skill.id)
                ),
            },
        }).unwrap();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Никнейм</label>
                <input {...register("username")} />
            </div>

            <div>
                <label htmlFor="avatar">Фото</label>

                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    {...register("avatar")}
                />
            </div>

            <div>
                <label>Страна</label>
                <input {...register("country")} />
            </div>

            <div>
                <label>Город</label>
                <input {...register("city")} />
            </div>

            <div>
                <label>Дата рождения</label>
                <input
                    type="date"
                    {...register("birthday")}
                />
            </div>

            <div>
                <label>Адрес</label>
                <input {...register("address")} />
            </div>

            <div>
                <label>Специальность</label>
                <select
                    {...register("specializationId", {
                        valueAsNumber: true,
                    })}
                    disabled={isSpecializationsLoading}
                >
                    <option value="">Выберите специальность</option>
                    {specializations?.data.map((specialization) => (
                        <option key={specialization.id} value={specialization.id}>
                            {specialization.title}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isLoading || isProfileUpdating}
            >
                {isLoading || isProfileUpdating
                    ? "Сохранение..."
                    : "Сохранить"}
            </button>
        </form>
    );
};