import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/auth/context.ts";
import { useEffect } from "react";

export const AuthProtectedRoute = () => {
  const { fetchUser, user } = useAuth();

  useEffect(() => {
    const test = async () => {
      await fetchUser();
      if (!user) return <Navigate to="/auth/sign-in" replace />;
    };
    test();
  }, []);

  return <Outlet />;
};
