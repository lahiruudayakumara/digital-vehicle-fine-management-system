import Reducer from "@stores/reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
