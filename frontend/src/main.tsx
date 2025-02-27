import "./index.css";

import MainRoute from "@/routes/main-route";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "@stores/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MainRoute />
    </Provider>
  </StrictMode>
);
