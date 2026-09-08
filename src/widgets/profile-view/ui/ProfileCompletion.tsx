interface ProfileCompletionProps {
    percentage: number;
    onEdit: () => void;
}

export const ProfileCompletion = ({
    percentage,
    onEdit,
}: ProfileCompletionProps) => {
    return (
        <section>
            <h2>Профиль заполнен на {percentage}%</h2>

            <button type="button" onClick={onEdit}>
                Редактировать профиль
            </button>
        </section>
    );
};