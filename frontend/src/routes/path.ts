import LoginPage from "@pages/auth/division-admin/login";
import DashboardPage from "@pages/dashboard/division-admin/index"; 
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage,
    },
    {
        path: "/dashboard",
        Component: DashboardPage,
    },
]);