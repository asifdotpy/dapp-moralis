import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'betAmount',
  initialState: {
    value: 0,
  },
  reducers: {
    setTwenty: (state) => {
      state.value = 20;
    },
    setFifty: (state) => {
      state.value = 50;
    },
    setHundred: (state) => {
        state.value = 100;
    },
    setFiveHundred: (state) => {
        state.value = 500;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { setTwenty, setFifty, setHundred, setFiveHundred, incrementByAmount } = counterSlice.actions
export const betAmountSelector = (state) => state.betAmount.value
export default counterSlice.reducer