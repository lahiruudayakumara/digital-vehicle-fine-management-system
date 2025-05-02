import authReducer from "@/stores/slices/auth/auth-slice";
import paymentReducer from "@/stores/slices/payment/payment-slice";
import { combineReducers } from "@reduxjs/toolkit";

const Reducer = combineReducers({
    auth: authReducer,
    payment: paymentReducer,
});

export default Reducer;