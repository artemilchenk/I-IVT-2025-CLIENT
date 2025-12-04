import { type FC, type ReactNode, useState } from "react";
import type {
  SignInData,
  SignUpData,
  SignUpResponseData,
  SignUpUserResponse,
} from "@/modules/auth/types.ts";
import { AuthContext } from "./context";
import { authService } from "@/modules/auth/service.ts";
import { useNavigate } from "react-router";
import { userService } from "@/modules/user/service.ts";
import type { UpdateUserData } from "@/modules/user/types.ts";

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SignUpUserResponse | null>(null);

  const setAuth = (response: SignUpResponseData) => {
    localStorage.setItem("token", response.access_token);
    setUser(response.user);
  };

  const signUp = async (value: SignUpData) => {
    const response = await authService.signUp(value);
    setAuth(response);
  };
  const signIn = async (value: SignInData) => {
    const response = await authService.signIn(value);
    setAuth(response);
  };
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/auth/sign-in", { replace: true });
  };

  const fetchUser = async () => {
    const response = await userService.getUser();
    setUser(response);
  };

  const updateUser = async (dto: UpdateUserData) => {
    const response = await userService.updateUser(dto);
    setUser(response);
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, fetchUser, updateUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
