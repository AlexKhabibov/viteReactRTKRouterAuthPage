import { useForm } from "react-hook-form";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export function ResetPasswordForm() {

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>();

    const onSubmit = (data: ResetPasswordFormData) => {

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                type="password"
                placeholder="Новый пароль"
                {...register("password", {
                    required: "Введите новый пароль",
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
                placeholder="Подтвердите новый пароль"
                {...register("confirmPassword", {
                    required: "Подтвердите новый пароль",
                    validate: (value, formValues) =>
                        value === formValues.password ||
                        "Пароли не совпадают",
                })}
            />

            {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
            )}

            <button type="submit">
                Сохранить новый пароль
            </button>

        </form>
    )
};