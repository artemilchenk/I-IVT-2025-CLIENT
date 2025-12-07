import { LoginForm } from "@/modules/auth/components/LoginForm.tsx";

import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";
import { useEffect } from "react";
import { useAuth } from "@/modules/auth/context.ts";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.PROFILE.path, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};
