import { CreateUserForm } from "@/modules/user/components/CreateUserForm.tsx";
import { useEffect } from "react";
import { ROUTES } from "@/constants/router.ts";
import { useNavigate } from "react-router";
import { useAuth } from "@/modules/auth/context.ts";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.PROFILE.path, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <CreateUserForm />
    </div>
  );
};
