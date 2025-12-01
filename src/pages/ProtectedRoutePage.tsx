import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/modules/auth/context.ts";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const AuthProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { getUserData } = useAuth();
  const userData = getUserData();

  return userData ? children : <Navigate to="/auth/sign-in" replace />;
};
