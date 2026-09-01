import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/loginApi";
import { setAccessToken } from "@/shared/api/lib";

import styles from "./LoginForm.module.css";

interface LoginFormData {
    email: string;
    password: string;
}

export function LoginForm() {
    const navigate = useNavigate();

    const [login, { isLoading, error }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login({
                username: data.email,
                password: data.password,
            }).unwrap();

            setAccessToken(result.access_token);

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (error) {
        return <h1>Ошибка</h1>;
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.field}>
                <label htmlFor="email">
                    Электронная почта
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Введите электронную почту"
                    {...register("email", {
                        required: "Введите email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Введите корректный email",
                        },
                    })}
                />

                {errors.email && (
                    <span className={styles.error}>
                        {errors.email.message}
                    </span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="password">
                    Пароль
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    {...register("password", {
                        required: "Введите пароль",
                        minLength: {
                            value: 8,
                            message:
                                "Пароль должен содержать минимум 8 символов",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                            message:
                                "Пароль должен содержать латинские буквы и цифры",
                        },
                    })}
                />

                {errors.password && (
                    <span className={styles.error}>
                        {errors.password.message}
                    </span>
                )}

                <Link
                    className={styles.forgotPassword}
                    to="/auth/forgot-password"
                >
                    Забыли пароль?
                </Link>
            </div>

            <button
                className={styles.submit}
                type="submit"
            >
                Вход
            </button>
        </form>
    );
}