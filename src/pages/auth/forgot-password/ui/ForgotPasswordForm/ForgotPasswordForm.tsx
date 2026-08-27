import { useForm } from "react-hook-form";

interface ForgotPasswordFormData {
    email: string;
}

export function ForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>();

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log(data);
    };

    return (
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
    );
}