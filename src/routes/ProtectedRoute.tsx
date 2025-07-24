import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authData } = useAuthStore();
  const location = useLocation();
  const isAuthenticated = !!authData?.accessToken;

  if (!isAuthenticated) {
    return <Navigate to="/operator/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
