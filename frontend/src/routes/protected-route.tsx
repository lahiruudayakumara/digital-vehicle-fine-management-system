import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
