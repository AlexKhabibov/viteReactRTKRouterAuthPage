import { useForm } from "react-hook-form";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { useUpdateUserMutation } from "@/features/update-user";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { useUpdateProfileMutation } from "@/features/update-profile";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { setEmail, setPhone } from "@/entities/user/model/userSlice";
import { setSocialNetworks, setSpecialistLevel } from "@/entities/profile/model/profileSlice";
import { useEffect, useState } from "react";

interface EditPersonalInfoFormProps {
    profile: Profile;
}

interface PersonalInfoForm {
    username: string;
    country: string;
    city: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
    avatar: FileList;
    specializationId: number | undefined;
    specialistLevel: string; // вопрос
    socialNetworks: {
        vk: string;
        instagram: string;
        facebook: string;
        linkedin: string;
        telegram: string;
        github: string;
        whatsapp: string;
    };
}

export const EditPersonalInfoForm = ({ profile }: EditPersonalInfoFormProps) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const previewUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : profile.avatarUrl ?? null;

    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        const url = URL.createObjectURL(selectedFile);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [selectedFile]);

    const socialNetworks = useSelector(
        (state: RootState) => state.profile.socialNetworks
    );

    const dispatch = useDispatch();

    const email = useSelector((state: RootState) => state.user.email);
    const phone = useSelector((state: RootState) => state.user.phone);
    const specialistLevel = useSelector((state: RootState) => state.profile.specialistLevel);

    const { data: specializations, isLoading: isSpecializationsLoading } =
        useGetSpecializationsQuery();

    const currentSpecializationId = profile.profiles[0]?.specializationId;

    const { register, handleSubmit } = useForm<PersonalInfoForm>({
        defaultValues: {
            username: profile.username ?? "",
            country: profile.country ?? "",
            city: profile.city ?? "",
            email: email || profile.email || "",
            phone: phone || profile.phone || "",
            birthday: profile.birthday?.slice(0, 10) ?? "",
            address: profile.address ?? "",
            specializationId: currentSpecializationId,
            specialistLevel,
            socialNetworks,
        },
    });

    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const [updateProfile, { isLoading: isProfileUpdating }] = useUpdateProfileMutation();

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith("image/")) {
            return;
        }
        setSelectedFile(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDeleteAvatar = async () => {

        await updateUser({
            id: profile.id,
            data: {
                avatarUrl: null,
            },
        }).unwrap();
    };

    const onSubmit = async (data: PersonalInfoForm) => {

        const professionalProfile = profile.profiles[0];

        if (!professionalProfile) return;
        if (data.specializationId === undefined) return;

        dispatch(setEmail(data.email));
        dispatch(setPhone(data.phone));
        dispatch(setSpecialistLevel(data.specialistLevel));
        dispatch(setSocialNetworks(data.socialNetworks));

        const file = selectedFile;

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
                <label>Фото</label>

                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Аватар"
                            width={120}
                            height={120}
                        />
                    ) : (
                        <div>
                            Перетащите фото сюда
                        </div>
                    )}

                    <label htmlFor="avatar">
                        Выбрать файл
                    </label>

                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        {...register("avatar")}
                        onChange={(event) => {
                            const file = event.target.files?.[0];

                            if (file) {
                                handleFileSelect(file);
                            }
                        }}
                    />

                    {profile.avatarUrl && (
                        <button
                            type="button"
                            onClick={handleDeleteAvatar}
                            disabled={isLoading}
                        >
                            Удалить фото
                        </button>
                    )}
                </div>
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
                <label>Email</label>
                <input type="email" {...register("email")} />
            </div>

            <div>
                <label>Телефон</label>
                <input type="tel" {...register("phone")} />
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

            <div>
                <label>Уровень специалиста</label>
                <input {...register("specialistLevel")} />
            </div>

            <div>
                <label>VK</label>
                <input {...register("socialNetworks.vk")} />
            </div>

            <div>
                <label>Instagram</label>
                <input {...register("socialNetworks.instagram")} />
            </div>

            <div>
                <label>Facebook</label>
                <input {...register("socialNetworks.facebook")} />
            </div>

            <div>
                <label>LinkedIn</label>
                <input {...register("socialNetworks.linkedin")} />
            </div>

            <div>
                <label>Telegram</label>
                <input {...register("socialNetworks.telegram")} />
            </div>

            <div>
                <label>GitHub</label>
                <input {...register("socialNetworks.github")} />
            </div>

            <div>
                <label>WhatsApp</label>
                <input {...register("socialNetworks.whatsapp")} />
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