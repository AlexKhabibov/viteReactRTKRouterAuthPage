interface HeaderProps {
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}

export function Header({
    isSidebarCollapsed,
    onToggleSidebar,
}: HeaderProps) {
    return (
        <header className="header">
            <div className="header__left">
                <div>Logo</div>

                <button type="button" onClick={onToggleSidebar}>
                    {isSidebarCollapsed
                        ? "Отобразить"
                        : "Свернуть"}
                </button>
            </div>

            <div className="header__right">
                <button type="button">
                    Настройки
                </button>

                <button type="button">
                    Профиль
                </button>
            </div>
        </header>
    );
}