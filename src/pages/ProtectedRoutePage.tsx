import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/auth/context.ts";

export const AuthProtectedRoute = () => {
  const { getUserData } = useAuth();
  const userData = getUserData();

  if (!userData?.user) return <Navigate to="/auth/sign-in" replace />;

  return <Outlet />;
};
