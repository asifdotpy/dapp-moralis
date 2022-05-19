import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
//default key to betAmount is named setBalancer
import betAmountReducer from "./reducers/betAmountReducer";
import selectedHorseReducer from "reducers/selectedHorseReducer";
import thunk from "redux-thunk";

export default configureStore(
  {
    reducer: {
      betAmount: betAmountReducer,
      selectedHorse: selectedHorseReducer,
    },
  },
  applyMiddleware(thunk),
);
