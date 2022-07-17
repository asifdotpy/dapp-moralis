import { configureStore } from "@reduxjs/toolkit";
//default key to betAmount is named setBalancer
import betAmountReducer from "./reducers/betAmountReducer";
import selectedHorseReducer from "reducers/selectedHorseReducer";
import { balanceReducer } from "reducers/balanceReducer";

export default configureStore({
  reducer: {
    betAmount: betAmountReducer,
    selectedHorse: selectedHorseReducer,
    userBalance: balanceReducer,
  },
});
