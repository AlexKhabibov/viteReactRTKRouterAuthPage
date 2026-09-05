type ProfileStep = "personal" | "about" | "skills";

interface ProfileTabsProps {
    step: ProfileStep;
    onChange: (step: ProfileStep) => void;
}

export const ProfileTabs = ({
    step,
    onChange,
}: ProfileTabsProps) => {
    return (
        <div>
            <button
                type="button"
                onClick={() => onChange("personal")}
                disabled={step === "personal"}
            >
                Личная информация
            </button>

            <button
                type="button"
                onClick={() => onChange("about")}
                disabled={step === "about"}
            >
                Обо мне
            </button>

            <button
                type="button"
                onClick={() => onChange("skills")}
                disabled={step === "skills"}
            >
                Навыки
            </button>

            <button type="button" disabled>
                Проекты
            </button>

            <button type="button" disabled>
                Опыт работы
            </button>

            <button type="button" disabled>
                Образование
            </button>
        </div>
    );
};