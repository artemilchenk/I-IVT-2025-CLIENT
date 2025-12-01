import { type FC, type ReactNode } from "react";
import type { User, UserCore } from "@/modules/auth/types.ts";
import { AuthContext } from "./context";
import { authService } from "@/modules/auth/service.ts";
import { useNavigate } from "react-router";

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const signUp = async (value: User) => {
    const response = await authService.signUp(value);
    if (response) localStorage.setItem("userData", JSON.stringify(response));

    return response;
  };
  const signIn = async (value: UserCore) => {
    const response = await authService.signIn(value);
    localStorage.setItem("userData", JSON.stringify(response));
    return response;
  };
  const signOut = () => {
    localStorage.removeItem("userData");
    navigate("/auth/sign-in", { replace: true });
  };

  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return null;
    return JSON.parse(userData);
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
