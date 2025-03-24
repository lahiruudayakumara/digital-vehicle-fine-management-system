import "./index.css";

import MainRoute from "@routes/main-route";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { ToastContainer } from 'react-toastify';
import TokenRefreshChecker from "./components/token-refresh-checker";
import { createRoot } from "react-dom/client";
import store from "@stores/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TokenRefreshChecker />
      <MainRoute />
      <ToastContainer position="bottom-center" />
    </Provider>
  </StrictMode>
);