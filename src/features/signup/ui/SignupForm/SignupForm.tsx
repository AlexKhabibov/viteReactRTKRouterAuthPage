import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSignupMutation } from "../../api/signupApi";
import { setAccessToken } from "@/shared/api/lib";

import styles from "./SignupForm.module.css";

interface SignupFormData {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    personalDataAgreement: boolean;
    marketingAgreement: boolean;
    contractAgreement: boolean;
}

export function SignupForm() {
    const navigate = useNavigate();

    const [signup, { isLoading, error }] = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>();

    const onSubmit = async (data: SignupFormData) => {
        try {
            const result = await signup({
                username: data.nickname,
                password: data.password,
                email: data.email,
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
                <label htmlFor="nickname">
                    Никнейм
                </label>

                <input
                    id="nickname"
                    type="text"
                    placeholder="Введите никнейм"
                    {...register("nickname", {
                        required: "Введите никнейм",
                    })}
                />

                {errors.nickname && (
                    <span className={styles.error}>
                        {errors.nickname.message}
                    </span>
                )}
            </div>

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
            </div>

            <div className={styles.field}>
                <label htmlFor="confirmPassword">
                    Подтвердить пароль
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Введите пароль"
                    {...register("confirmPassword", {
                        required: "Подтвердите пароль",
                        validate: (value, formValues) =>
                            value === formValues.password ||
                            "Пароли не совпадают",
                    })}
                />

                {errors.confirmPassword && (
                    <span className={styles.error}>
                        {errors.confirmPassword.message}
                    </span>
                )}
            </div>

            <button
                className={styles.submit}
                type="submit"
            >
                Зарегистрироваться
            </button>

            <div className={styles.agreements}>
                <p>
                    Проставив галочку («✓») и нажимая
                    «Зарегистрироваться»:
                </p>

                <label>
                    <input
                        type="checkbox"
                        {...register("personalDataAgreement", {
                            required:
                                "Необходимо дать согласие на обработку данных",
                        })}
                    />

                    <span>
                        Даю согласие на обработку данных
                    </span>
                </label>

                {errors.personalDataAgreement && (
                    <span className={styles.error}>
                        {errors.personalDataAgreement.message}
                    </span>
                )}

                <label>
                    <input
                        type="checkbox"
                        {...register("contractAgreement", {
                            required:
                                "Необходимо ознакомиться с договором",
                        })}
                    />

                    <span>
                        Я подтверждаю что ознакомился(-ась)
                        с Договором-офертой
                    </span>
                </label>

                {errors.contractAgreement && (
                    <span className={styles.error}>
                        {errors.contractAgreement.message}
                    </span>
                )}

                <label>
                    <input
                        type="checkbox"
                        {...register("marketingAgreement")}
                    />

                    <span>
                        Даю согласие на получение рекламных
                        и информационных рассылок
                    </span>
                </label>
            </div>
        </form>
    );
}