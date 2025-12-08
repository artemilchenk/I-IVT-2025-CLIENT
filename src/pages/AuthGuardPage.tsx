import { Outlet, useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";
import { useEffect } from "react";
import { useAuth } from "@/modules/auth/context.ts";

export const AuthGuardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && navigate) {
      navigate(ROUTES.AUTH.SIGN_IN.path, { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <Outlet />;
};
