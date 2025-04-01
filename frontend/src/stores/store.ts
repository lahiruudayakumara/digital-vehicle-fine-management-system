import { configureStore } from "@reduxjs/toolkit";
import officerReducer from "@/stores/slices/officer/officer-slice"; // Adjust the import based on your folder structure
import authReducer from "@/stores/slices/auth/auth-slice"; // Assuming you also have an auth slice (for your `auth` state)

const store = configureStore({
  reducer: {
    officer: officerReducer,  // Attach officer reducer here
    auth: authReducer,        // Add auth reducer if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
