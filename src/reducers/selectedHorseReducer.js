import { createSlice } from "@reduxjs/toolkit";

const selectedHorseSlice = createSlice({
    name: "selectedHorse",
    initialState: {
        value: {
            white: false,
            blue: false,
        }
    },
    reducers: {
        selectedWhite: (state) => {
            state.value = { white: true, blue: false }
        },
        selectedBlue: (state) => {
            state.value = { white: false, blue: true }
        }
    }
})

export const { selectedWhite, selectedBlue } = selectedHorseSlice.actions;
export const selectedHorse = (state) => state.selectedHorse.value;
export default selectedHorseSlice.reducer;