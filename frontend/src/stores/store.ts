import Reducer from "@stores/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"

const store = configureStore({
    reducer: Reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;