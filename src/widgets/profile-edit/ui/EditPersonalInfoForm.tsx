import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useForm } from "react-hook-form";
import {
    useSelector,
    useDispatch,
} from "react-redux";
import type { Profile } from "@/features/get-profile/api/profileApi";
import {
    useGetSpecializationsQuery,
} from "@/features/get-specializations";
import type { ProfileChanges } from "@/features/update-profile/api/profileApi";
import { useUpdateUserMutation } from "@/features/update-user";
import {
    setSpecialistLevel,
    setSocialNetworks,
} from "@/entities/profile/model/profileSlice";
import styles from "./EditPersonalInfoForm.module.css";
import type { RootState } from "@/app/store/store";

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

interface EditPersonalInfoFormProps {
    profile: Profile;
    onSubmit: (
        changes: ProfileChanges
    ) => Promise<void>;
    onSuccess: () => void;
    isSaving: boolean;
}

export const EditPersonalInfoForm = ({
    profile,
    onSubmit,
    onSuccess,
    isSaving,
}: EditPersonalInfoFormProps) => {
    const dispatch = useDispatch();

    const specialistLevel = useSelector(
        (state: RootState) =>
            state.profile.specialistLevel
    );

    const socialNetworks = useSelector(
        (state: RootState) =>
            state.profile.socialNetworks
    );

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const professionalProfile =
        profile.profiles[0];

    const {
        data: specializations,
    } = useGetSpecializationsQuery({
        page: 1,
        limit: 100,
    });

    const [
        updateUser,
        { isLoading: isUpdatingUser },
    ] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        watch,
    } = useForm<PersonalInfoForm>({
        defaultValues: {
            username: profile.username,
            country: profile.country,
            city: profile.city,
            email: profile.email,
            phone: profile.phone,
            birthday: profile.birthday
                ? profile.birthday.slice(0, 10)
                : "",
            address: profile.address,
            specializationId:
                professionalProfile?.specializationId,
            specialistLevel,
            socialNetworks,
        },
    });

    const previewUrl = useMemo(() => {
        if (!selectedFile) {
            return profile.avatarUrl;
        }

        return URL.createObjectURL(
            selectedFile
        );
    }, [selectedFile, profile.avatarUrl]);

    useEffect(() => {
        return () => {
            if (selectedFile) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [selectedFile, previewUrl]);

    const specializationId = watch(
        "specializationId"
    );

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                "Размер файла не должен превышать 5 МБ"
            );
            return;
        }

        setSelectedFile(file);
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        const file =
            event.dataTransfer.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                "Размер файла не должен превышать 5 МБ"
            );
            return;
        }

        setSelectedFile(file);
    };

    const handleDeletePhoto = async () => {
        try {
            await updateUser({
                id: profile.id,
                data: {
                    avatarUrl: null,
                    avatarImage: "",
                },
            }).unwrap();

            setSelectedFile(null);
        } catch (error) {
            console.error(
                "Ошибка удаления фотографии:",
                error
            );
        }
    };

    const fileToBase64 = (
        file: File
    ): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                if (typeof result !== "string") {
                    reject(
                        new Error(
                            "Не удалось прочитать файл"
                        )
                    );
                    return;
                }

                const base64 =
                    result.split(",")[1];

                resolve(base64);
            };

            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsDataURL(file);
        });

    const handleSubmitForm = async (
        data: PersonalInfoForm
    ) => {
        try {
            dispatch(
                setSpecialistLevel(
                    data.specialistLevel
                )
            );

            dispatch(
                setSocialNetworks(
                    data.socialNetworks
                )
            );

            let avatarImage:
                | string
                | undefined;

            if (selectedFile) {
                avatarImage =
                    await fileToBase64(
                        selectedFile
                    );
            }

            await updateUser({
                id: profile.id,
                data: {
                    username: data.username,
                    country: data.country,
                    city: data.city,
                    birthday: data.birthday
                        ? new Date(
                            data.birthday
                        ).toISOString()
                        : undefined,
                    address: data.address,
                    ...(avatarImage && {
                        avatarImage,
                    }),
                },
            }).unwrap();

            await onSubmit({
                specializationId:
                    data.specializationId,
            });

            setSelectedFile(null);

            onSuccess();
        } catch (error) {
            console.error(
                "Ошибка сохранения личной информации:",
                error
            );
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(
                handleSubmitForm
            )}
        >
            <div className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>Фотография</h2>

                    <p>
                        Выберите фотографию
                        профиля
                    </p>
                </div>

                <div className={styles.photoContent}>
                    <div className={styles.photoRow}>
                        <div
                            className={
                                styles.photoColumn
                            }
                        >
                            {previewUrl ? (
                                <img
                                    className={
                                        styles.avatar
                                    }
                                    src={previewUrl}
                                    alt="Аватар"
                                />
                            ) : (
                                <div
                                    className={
                                        styles.avatarPlaceholder
                                    }
                                >
                                    Нет фото
                                </div>
                            )}

                            <button
                                className={
                                    styles.deletePhoto
                                }
                                type="button"
                                onClick={
                                    handleDeletePhoto
                                }
                            >
                                Удалить фото
                            </button>
                        </div>

                        <div
                            className={
                                styles.dropzone
                            }
                            onDragOver={(event) =>
                                event.preventDefault()
                            }
                            onDrop={handleDrop}
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={
                                    handleFileChange
                                }
                            />

                            <div
                                className={
                                    styles.uploadIcon
                                }
                            >
                                ↑
                            </div>

                            <div>
                                Перетащите фото сюда
                                или{" "}
                                <strong>
                                    выберите файл
                                </strong>
                            </div>

                            <small>
                                PNG, JPG до 5 МБ
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>
                        Личная информация
                    </h2>

                    <p>
                        Основная информация
                        вашего профиля
                    </p>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label>
                            Никнейм
                        </label>

                        <input
                            {...register(
                                "username"
                            )}
                            placeholder="Никнейм"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Специальность
                        </label>

                        <select
                            {...register(
                                "specializationId",
                                {
                                    valueAsNumber:
                                        true,
                                }
                            )}
                            value={
                                specializationId ??
                                ""
                            }
                        >
                            <option value="">
                                Выберите
                                специальность
                            </option>

                            {specializations?.data?.map(
                                (
                                    specialization
                                ) => (
                                    <option
                                        key={
                                            specialization.id
                                        }
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
                    </div>

                    <div className={styles.field}>
                        <label>Email</label>

                        <input
                            {...register("email")}
                            placeholder="Email"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Телефон
                        </label>

                        <input
                            {...register("phone")}
                            placeholder="Телефон"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Дата рождения
                        </label>

                        <input
                            type="date"
                            {...register(
                                "birthday"
                            )}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Страна
                        </label>

                        <input
                            {...register(
                                "country"
                            )}
                            placeholder="Страна"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Город
                        </label>

                        <input
                            {...register("city")}
                            placeholder="Город"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Адрес
                        </label>

                        <input
                            {...register(
                                "address"
                            )}
                            placeholder="Адрес"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionInfo}>
                    <h2>
                        Социальные сети
                    </h2>

                    <p>
                        Ссылки на ваши
                        социальные сети
                    </p>
                </div>

                <div
                    className={
                        styles.socialFields
                    }
                >
                    {(
                        Object.keys(
                            socialNetworks
                        ) as Array<
                            keyof PersonalInfoForm["socialNetworks"]
                        >
                    ).map((network) => (
                        <div
                            className={
                                styles.field
                            }
                            key={network}
                        >
                            <label>
                                {network}
                            </label>

                            <input
                                {...register(
                                    `socialNetworks.${network}`
                                )}
                                placeholder={
                                    network
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.submitRow}>
                <button
                    className={
                        styles.saveButton
                    }
                    type="submit"
                    disabled={
                        isSaving ||
                        isUpdatingUser
                    }
                >
                    {isSaving ||
                        isUpdatingUser
                        ? "Сохранение..."
                        : "Далее"}

                    {!isSaving &&
                        !isUpdatingUser && (
                            <span>→</span>
                        )}
                </button>
            </div>
        </form>
    );
};