import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../api/loginApi";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {

    const [login, { isLoading, error }] = useLoginMutation();

    const { register,
        handleSubmit,
        formState: { errors }, } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login({
                username: data.email,
                password: data.password,
            }).unwrap();

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <h1>Загрузка...</h1>
    if (error) return <h1> Ошибка</h1>

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

                <Link to="/auth/forgot-password">
                    Забыли пароль?
                </Link>

                <button type="submit">
                    Войти
                </button>

            </form>
        </>
    )
};