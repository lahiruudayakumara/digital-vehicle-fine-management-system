import DashboardLayout from "@layouts/dashboard";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../protected-route";

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
