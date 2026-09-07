import type { ProfileState } from "@/entities/profile/model/types";
import type { UserState } from "@/entities/user/model/types";

interface PersistedState {
    user: UserState;
    profile: ProfileState;
}

export const loadState = (): PersistedState | undefined => {
    try {
        const serializedState = localStorage.getItem("appState");

        if (!serializedState) {
            return undefined;
        }

        return JSON.parse(serializedState) as PersistedState;
    } catch {
        return undefined;
    }
};

export const saveState = (state: PersistedState) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem("appState", serializedState);
    } catch {
        // ничего не делаем
    }
};