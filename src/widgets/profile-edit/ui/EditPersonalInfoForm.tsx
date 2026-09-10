import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { Profile } from "@/features/get-profile/api/profileApi";
import { useUpdateUserMutation } from "@/features/update-user";
import { useGetSpecializationsQuery } from "@/features/get-specializations";
import { useUpdateProfileMutation } from "@/features/update-profile";

import type { RootState, AppDispatch } from "@/app/store/store";

import {
    setEmail,
    setPhone,
} from "@/entities/user/model/userSlice";

import {
    setSocialNetworks,
    setSpecialistLevel,
} from "@/entities/profile/model/profileSlice";

import styles from "./EditPersonalInfoForm.module.css";

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
    specializationId: number | undefined;
    specialistLevel: string;
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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const EditPersonalInfoForm = ({
    profile,
}: EditPersonalInfoFormProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(
        null
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const previewUrl = useMemo(() => {
        if (selectedFile) {
            return URL.createObjectURL(selectedFile);
        }

        return profile.avatarUrl ?? null;
    }, [selectedFile, profile.avatarUrl]);

    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [selectedFile, previewUrl]);

    const dispatch = useDispatch<AppDispatch>();

    const email = useSelector(
        (state: RootState) => state.user.email
    );

    const phone = useSelector(
        (state: RootState) => state.user.phone
    );

    const specialistLevel = useSelector(
        (state: RootState) => state.profile.specialistLevel
    );

    const socialNetworks = useSelector(
        (state: RootState) => state.profile.socialNetworks
    );

    const { data: specializations } =
        useGetSpecializationsQuery();

    const currentSpecializationId =
        profile.profiles[0]?.specializationId;

    const { register, handleSubmit } =
        useForm<PersonalInfoForm>({
            defaultValues: {
                username: profile.username ?? "",
                country: profile.country ?? "",
                city: profile.city ?? "",
                email: email || profile.email || "",
                phone: phone || profile.phone || "",
                birthday:
                    profile.birthday?.slice(0, 10) ?? "",
                address: profile.address ?? "",
                specializationId: currentSpecializationId,
                specialistLevel,
                socialNetworks,
            },
        });

    const [updateUser, { isLoading }] =
        useUpdateUserMutation();

    const [
        updateProfile,
        { isLoading: isProfileUpdating },
    ] = useUpdateProfileMutation();

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith("image/")) {
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            return;
        }

        setSelectedFile(file);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            handleFileSelect(file);
        }

        event.target.value = "";
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteAvatar = async () => {
        await updateUser({
            id: profile.id,
            data: {
                avatarUrl: null,
            },
        }).unwrap();

        setSelectedFile(null);
    };

    const onSubmit = async (data: PersonalInfoForm) => {
        const professionalProfile = profile.profiles[0];

        if (!professionalProfile) {
            return;
        }

        if (data.specializationId === undefined) {
            return;
        }

        dispatch(setEmail(data.email));
        dispatch(setPhone(data.phone));
        dispatch(setSpecialistLevel(data.specialistLevel));
        dispatch(setSocialNetworks(data.socialNetworks));

        const file = selectedFile;

        let avatarImage: string | undefined;

        if (file) {
            avatarImage = await new Promise<string>(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        const result =
                            reader.result as string;

                        resolve(result.split(",")[1]);
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                }
            );
        }

        await updateUser({
            id: profile.id,
            data: {
                username: data.username,
                country: data.country,
                city: data.city || undefined,
                birthday:
                    data.birthday || undefined,
                address: data.address,
                avatarImage,
            },
        }).unwrap();

        await updateProfile({
            id: professionalProfile.id,
            data: {
                userId: profile.id,
                specializationId:
                    data.specializationId,
                markingWeight:
                    professionalProfile.markingWeight,
                description:
                    professionalProfile.description,
                socialNetwork: [],
                image_src:
                    professionalProfile.image_src,
                profileSkills:
                    professionalProfile.profileSkills.map(
                        (skill) => String(skill.id)
                    ),
            },
        }).unwrap();

        setSelectedFile(null);
    };

    const socialNetworkFields = Object.keys(
        socialNetworks
    ) as Array<keyof PersonalInfoForm["socialNetworks"]>;

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <section className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>Фото профиля</h2>

                    <p>
                        Поделитесь своими профилями
                        <br />
                        в других соц. сетях
                    </p>
                </div>

                <div className={styles.photoContent}>
                    <div className={styles.photoRow}>
                        <div className={styles.photoColumn}>
                            {previewUrl ? (
                                <img
                                    className={styles.avatar}
                                    src={previewUrl}
                                    alt="Фото профиля"
                                />
                            ) : (
                                <div
                                    className={
                                        styles.avatarPlaceholder
                                    }
                                >
                                    Фото
                                </div>
                            )}

                            <button
                                type="button"
                                className={
                                    styles.deletePhoto
                                }
                                onClick={
                                    handleDeleteAvatar
                                }
                            >
                                Удалить фото
                            </button>
                        </div>

                        <div
                            className={styles.dropzone}
                            onClick={handleUploadClick}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            role="button"
                            tabIndex={0}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={handleFileChange}
                                hidden
                            />

                            <span
                                className={
                                    styles.uploadIcon
                                }
                            >
                                ↑
                            </span>

                            <span>
                                <strong>
                                    Кликни для изменения
                                </strong>{" "}
                                или перетащи сюда фотографию
                            </span>

                            <small>
                                JPG, PNG, JPEG (не более 5Мб)
                            </small>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>Персональная информация</h2>

                    <p>
                        Поделитесь своими профилями
                        <br />
                        в других соц. сетях
                    </p>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label>Никнейм *</label>
                        <input {...register("username")} />
                    </div>

                    <div className={styles.field}>
                        <label>Номер для связи</label>
                        <input {...register("phone")} />
                    </div>

                    <div className={styles.field}>
                        <label>IT специальность *</label>

                        <select
                            {...register("specializationId", {
                                valueAsNumber: true,
                            })}
                        >
                            {specializations?.data.map(
                                (specialization) => (
                                    <option
                                        key={specialization.id}
                                        value={
                                            specialization.id
                                        }
                                    >
                                        {
                                            specialization.title
                                        }
                                    </option>
                                )
                            )}
                        </select>

                        <button
                            type="button"
                            className={styles.linkButton}
                        >
                            Сменить специальность
                        </button>
                    </div>

                    <div className={styles.field}>
                        <label>Локация</label>
                        <input {...register("city")} />
                    </div>

                    <div className={styles.field}>
                        <label>Email для связи</label>
                        <input {...register("email")} />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Уровень специалиста
                        </label>

                        <select
                            {...register(
                                "specialistLevel"
                            )}
                        >
                            <option value="">
                                Не указан
                            </option>

                            <option value="Junior">
                                Junior
                            </option>

                            <option value="Middle">
                                Middle
                            </option>

                            <option value="Senior">
                                Senior
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>Личные ссылки</h2>

                    <p>
                        Поделитесь своими профилями
                        <br />
                        в других соц. сетях
                    </p>
                </div>

                <div className={styles.socialFields}>
                    {socialNetworkFields.map((network) => (
                        <div
                            className={styles.field}
                            key={network}
                        >
                            <label>{network}</label>

                            <input
                                {...register(
                                    `socialNetworks.${network}`
                                )}
                                placeholder="Ссылка"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <div className={styles.submitRow}>
                <button
                    className={styles.saveButton}
                    type="submit"
                    disabled={
                        isLoading ||
                        isProfileUpdating
                    }
                >
                    {isLoading ||
                        isProfileUpdating
                        ? "Сохранение..."
                        : "Сохранить"}
                </button>
            </div>
        </form>
    );
};