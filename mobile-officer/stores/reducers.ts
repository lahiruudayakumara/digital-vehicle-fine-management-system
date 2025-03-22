import authReducer from "./slices/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import scannerReducer from "./slices/scannerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  scanner: scannerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;