import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendResetPasswordMutation } from "../../api/forgotPasswordApi";

interface ForgotPasswordFormData {
    email: string;
}

export function ForgotPasswordForm() {
    const [sendResetPassword, { isLoading, error }] =
        useSendResetPasswordMutation();

    const [isRecoveryEmailSent, setIsRecoveryEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            const result = await sendResetPassword(data.email).unwrap();

            console.log(result.message);

            setIsRecoveryEmailSent(true);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка</p>;

    return (
        <>
            {!isRecoveryEmailSent && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Введите email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Введите корректный email",
                            },
                        })}
                    />

                    {errors.email && (
                        <span>{errors.email.message}</span>
                    )}

                    <button type="submit">
                        Отправить
                    </button>
                </form>
            )}

            {isRecoveryEmailSent && (
                <>
                    <h2>Письмо отправлено</h2>

                    <p>
                        Проверьте вашу почту. Мы отправили письмо
                        для восстановления пароля.
                    </p>
                </>
            )}
        </>
    );
}