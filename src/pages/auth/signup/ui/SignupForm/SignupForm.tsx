import { useForm } from "react-hook-form";

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

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>();

    const onSubmit = (data: SignupFormData) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    type="text"
                    placeholder="Никнейм"
                    {...register("nickname", {
                        required: "Введите никнейм",
                    })}
                />

                {errors.nickname && (
                    <span>{errors.nickname.message}</span>
                )}

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

                <input
                    type="password"
                    placeholder="Пароль"
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
                    {...register("confirmPassword", {
                        required: "Подтвердите пароль",
                        validate: (value, formValues) =>
                            value === formValues.password ||
                            "Пароли не совпадают",
                    })}
                />

                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}

                <button type="submit">
                    Зарегистрироваться
                </button>

                <label>
                    <input
                        type="checkbox"
                        {...register("personalDataAgreement", {
                            required: "Необходимо дать согласие на обработку данных",
                        })}
                    />
                    Даю согласие на обработку данных
                </label>

                {errors.personalDataAgreement && (
                    <span>{errors.personalDataAgreement.message}</span>
                )}

                <label>
                    <input
                        type="checkbox"
                        {...register("contractAgreement", {
                            required: "Необходимо ознакомиться с договором",
                        })}
                    />
                    Ознакомлен с договором
                </label>

                {errors.contractAgreement && (
                    <span>{errors.contractAgreement.message}</span>
                )}

                <label>
                    <input
                        type="checkbox"
                        {...register("marketingAgreement")}
                    />
                    Даю согласие на получение маркетинговой информации
                </label>
            </form>
        </>
    )
};