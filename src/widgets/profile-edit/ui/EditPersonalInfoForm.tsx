import { useForm } from "react-hook-form";
import type { Profile } from "@/features/get-profile/api/profileApi";
import { useUpdateUserMutation } from "@/features/update-user";

interface EditPersonalInfoFormProps {
    profile: Profile;
}

interface PersonalInfoForm {
    username: string;
    country: string;
    city: string;
    birthday: string;
    address: string;
}

export const EditPersonalInfoForm = ({
    profile,
}: EditPersonalInfoFormProps) => {

    const { register, handleSubmit } = useForm<PersonalInfoForm>({
        defaultValues: {
            username: profile.username,
            country: profile.country,
            city: profile.city,
            birthday: profile.birthday.slice(0, 10),
            address: profile.address,
        },
    });

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const onSubmit = async (data: PersonalInfoForm) => {
        await updateUser({
            id: profile.id,
            data: {
                username: data.username,
                country: data.country,
                city: data.city,
                birthday: data.birthday,
                address: data.address,
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
                <label>Страна</label>
                <input {...register("country")} />
            </div>

            <div>
                <label>Город</label>
                <input {...register("city")} />
            </div>

            <div>
                <label>Дата рождения</label>
                <input type="date" {...register("birthday")} />
            </div>

            <div>
                <label>Адрес</label>
                <input {...register("address")} />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
        </form>
    );
};