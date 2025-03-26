import authReducer from "./auth/auth-slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;