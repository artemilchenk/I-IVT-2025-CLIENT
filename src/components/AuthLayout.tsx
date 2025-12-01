import { Outlet } from "react-router";
import { BaseButton } from "./ui/button";
import { useAuth } from "@/modules/auth/context.ts";

export const AuthLayout = () => {
  const { getUserData } = useAuth();
  const userData = getUserData();

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && <BaseButton>Sign Out</BaseButton>}
      <Outlet />
    </div>
  );
};
