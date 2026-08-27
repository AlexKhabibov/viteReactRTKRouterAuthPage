import { useState } from "react";
import { useForm } from "react-hook-form";

interface ForgotPasswordFormData {
    email: string;
}

export function ForgotPasswordForm() {

    const [isRecoveyPassEmailSent, setRecoveyPassEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log(data);

        setRecoveyPassEmailSent(true);
    };

    return (
        <>
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
            {
                isRecoveyPassEmailSent && (
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