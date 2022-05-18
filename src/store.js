import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
//default key to betAmount is named setBalancer
import betAmountReducer from "./reducers/reducer"
import thunk from 'redux-thunk'


export default configureStore({
  reducer: {
    betAmount: betAmountReducer
  }
}, applyMiddleware(thunk))