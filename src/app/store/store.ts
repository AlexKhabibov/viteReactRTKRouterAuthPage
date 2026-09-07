import { profileReducer } from "@/entities/profile";
import { userReducer } from "@/entities/user";
import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../storage/storage";

const preloadedState = loadState();

export const store = configureStore({

    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        profile: profileReducer,
        user: userReducer,
    },

    preloadedState,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

store.subscribe(() => {
    const state = store.getState();

    saveState({
        user: state.user,
        profile: state.profile,
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;