import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileState, SocialNetworks } from "./types";

const initialState: ProfileState = {
    specialistLevel: "",
    socialNetworks: {
        vk: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        telegram: "",
        github: "",
        whatsapp: "",
    },
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setSpecialistLevel: (
            state,
            action: PayloadAction<string>
        ) => {
            state.specialistLevel = action.payload;
        },

        setSocialNetworks: (
            state,
            action: PayloadAction<SocialNetworks>
        ) => {
            state.socialNetworks = action.payload;
        },
    },
});

export const {
    setSpecialistLevel,
    setSocialNetworks,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;