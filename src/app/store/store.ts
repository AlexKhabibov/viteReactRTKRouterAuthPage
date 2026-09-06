import { profileReducer } from "@/entities/profile";
import { userReducer } from "@/entities/user";
import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({

    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        profile: profileReducer,
        user: userReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;