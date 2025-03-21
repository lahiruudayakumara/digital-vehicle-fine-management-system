import AdminDashboard from "@routes/section/divisional-admin-dashboard";
import BlackListPage from "@/pages/division-admin/black-list/black-list";
import DashboardPage from "@/pages/division-admin/overview/index";
import LoginPage from "@pages/auth/division-admin/login";
import NewOfficerPage from "@/pages/division-admin/add-new-officer/addOfficerForm";
import OfficerManagePage from "@/pages/division-admin/officer-managment/officer-management"
import UpdateOfficerPage from "@/pages/division-admin/update-officer/update-officer-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage,
    },
    {
        path: "/dashboard",
        Component: AdminDashboard,
        children: [
            {
                index: true,
                Component: DashboardPage,
            },
            {
                path: "officer-manage",
                Component: OfficerManagePage,
            },
            {
                path: "add-new-officer",
                Component: NewOfficerPage,
            },
            {
                path: "update-officer",
                Component: UpdateOfficerPage,
            },
            {
                path: "black-list",
                Component: BlackListPage,
            }
        ],
    },
]);