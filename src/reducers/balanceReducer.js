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
  async (thunkAPI) => {
    //by default Moralis query find the current user
    var response = await Moralis.User.current();
    //retriving user address for various purpose
    const userEthAddress = response.get("ethAddress");
    const query = new Moralis.Query("_User");
    query.equalTo("ethAddress", userEthAddress);
    let results = await query.find();
    // results returns a promise that has an attributes key
    let balance = results[0]["attributes"]["balance"];
    return balance;
  },
);

const userBalanceSlice = createSlice({
  name: "userBalance",
  initialState: {
    value: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchBalance.fulfilled](state, { payload }) {
      state.value = payload;
    },
  },
});

export const userBalance = (state) => state.userBalance.value;
export const balanceReducer = userBalanceSlice.reducer;
