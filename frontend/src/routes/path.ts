import LoginPage from "@pages/auth/division-admin/login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage,
    },
]);