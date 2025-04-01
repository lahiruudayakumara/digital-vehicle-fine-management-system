
import authReducer from "./slices/auth/auth-slice";
import { combineReducers } from "@reduxjs/toolkit";
import scannerReducer from "./slices/scannerSlice";
import finesReducer from './slices/fine/fine-slice'; // Import the fines reducer

const rootReducer = combineReducers({
  auth: authReducer,
  scanner: scannerReducer,
  fines: finesReducer, // Add the fines reducer here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;