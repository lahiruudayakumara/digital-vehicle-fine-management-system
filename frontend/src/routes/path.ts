import LoginPage from "@pages/auth/division-admin/login";
import DashboardPage from "@pages/dashboard/division-admin/index"; 
import OfficerManagePage from "@/pages/officer-management/division-admin/officer-management"
import NewOfficerPage from "@pages/add-new-officer/addOfficerForm"; 
import UpdateOfficerPage from "@pages/update-officer/update-officer-form"; 

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
    {
        path: "/officermanage",
        Component: OfficerManagePage,
    },

    {
        path: "/addnewofficer",
        Component: NewOfficerPage,
    },
    {
        path: "/updateofficer",
        Component: UpdateOfficerPage,
    },
]);