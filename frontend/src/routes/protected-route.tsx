import { AppDispatch, RootState } from "@/stores/store";

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { logout } from "@/stores/slices/auth/auth-actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, role } = useSelector((state: RootState) => ({
    token: state.auth.token,
    role: state.auth.role,
  }));

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    dispatch(logout());
    toast.error("You are not authorized user.");
    return;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
