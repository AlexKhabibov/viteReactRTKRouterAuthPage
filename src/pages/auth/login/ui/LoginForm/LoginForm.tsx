import { useForm } from "react-hook-form";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {

    const { register,
        handleSubmit,
        formState: { errors }, } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("email", {
                        required: "Введите email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Введите корректный email",
                        },
                    })} />

                {errors.email && (
                    <span>{errors.email.message}</span>
                )}

                <input
                    type="password"
                    {...register("password", {
                        required: "Введите пароль",
                        minLength: {
                            value: 8,
                            message: "Пароль должен содержать минимум 8 символов",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                            message: "Пароль должен содержать латинские буквы и цифры",
                        },
                    })} />

                {errors.password && (
                    <span>{errors.password.message}</span>
                )}

                <button type="submit">
                    Войти
                </button>
            </form>
        </>
    )
};