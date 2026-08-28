import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/resetPasswordApi";
import { setAccessToken } from "@/shared/api/lib";

interface ResetPasswordFormData {
    password: string;
    passwordConfirm: string;
}

export function ResetPasswordForm() {
    const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ResetPasswordFormData>();

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            console.log("Токен отсутствует");
            return;
        }

        try {
            const result = await resetPassword({
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                token,
            }).unwrap();

            setAccessToken(result.access_token);
            setIsPasswordReset(true);

        } catch (error) {
            console.log(error);
        }
    };
    
    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка</p>;
    if (!token) return <p>Недействительная ссылка для восстановления пароля</p>;
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
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                        message:
                            "Пароль должен содержать латинские буквы и цифры",
                    },
                })}
            />

            {errors.password && (
                <span>{errors.password.message}</span>
            )}

            <input
                type="password"
                placeholder="Подтвердите пароль"
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
}