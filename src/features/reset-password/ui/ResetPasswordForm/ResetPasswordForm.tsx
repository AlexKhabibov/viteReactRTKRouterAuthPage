import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../api/resetPasswordApi";
import { useState } from "react";

interface ResetPasswordFormData {
    password: string;
    passwordConfirm: string;
}

export function ResetPasswordForm() {


    const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ResetPasswordFormData>();

    const onSubmit = async (data: ResetPasswordFormData) => {

        try {
            const result = await resetPassword({
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                token: "token", // временно
            }).unwrap();

            console.log(result);

            setIsPasswordReset(true);

        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка</p>;
    if (isPasswordReset) return <h2>Пароль успешно изменён</h2>;

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                type="password"
                placeholder="Новый пароль"
                {...register("password", {
                    required: "Введите пароль",
                    minLength: {
                        value: 8,
                        message: "Пароль должен содержать минимум 8 символов",
                    },
                })}
            />

            {errors.password && (
                <span>{errors.password.message}</span>
            )}

            <input
                type="password"
                placeholder="Повторите пароль"
                {...register("passwordConfirm", {
                    required: "Подтвердите пароль",
                    validate: (value) =>
                        value === getValues("password") ||
                        "Пароли не совпадают",
                })}
            />

            {errors.passwordConfirm && (
                <span>{errors.passwordConfirm.message}</span>
            )}

            <button type="submit">
                Изменить пароль
            </button>
        </form>
    );
};