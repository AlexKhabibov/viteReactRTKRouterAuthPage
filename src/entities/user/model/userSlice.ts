import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./types";

const initialState: UserState = {
    email: "",
    phone: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
    },
});

export const { setEmail, setPhone } = userSlice.actions;

export const userReducer = userSlice.reducer;