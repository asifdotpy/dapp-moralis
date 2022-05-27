import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

/* import moralis */
const Moralis = require("moralis");
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
Moralis.start({ serverUrl, appId });

//since balanceReducer is an extraReducer function. It is created
//by createAction class

export const fetchBalance = createAsyncThunk(
    "userBalance/fetchBalance",
    async(thunkAPI) => {
    //by default Moralis query find the current user
    var response = await Moralis.User.current();
    return JSON.stringify(response);
})

const userBalanceSlice = createSlice({
    name: "userBalance",
    initialState: {
        value: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchBalance.fulfilled] (state, { payload }) {
            var data = JSON.parse(payload)
            state.value = data["balance"]
        }
    }
})



export const userBalance = (state) => state.userBalance.value;
export const balanceReducer = userBalanceSlice.reducer;