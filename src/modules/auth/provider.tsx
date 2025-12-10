import { type FC, type ReactNode } from "react";
import type {
  SignInData,
  SignUpData,
  SignUpUserResponse,
} from "@/modules/auth/types.ts";
import { AuthContext } from "./context";
import { authService } from "@/modules/auth/service.ts";
import { useNavigate } from "react-router";
import { userService } from "@/modules/user/service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  UpdateUserDataBase,
  UpdateUserDataFull,
} from "@/modules/user/types.ts";
import { ROUTES } from "@/constants/router.ts";

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    return await userService.getUser();
  };

  const { isLoading, data: user } = useQuery<SignUpUserResponse>({
    queryKey: ["profile"],
    queryFn: fetchUser,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const signUp = async (value: SignUpData) => {
    const response = await authService.signUp(value);
    saveToken(response.access_token);
    return response.user;
  };
  const signIn = async (value: SignInData) => {
    const response = await authService.signIn(value);
    saveToken(response.access_token);

    return response.user;
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    await queryClient.setQueryData(["profile"], null);
    navigate(ROUTES.AUTH.SIGN_IN.path, { replace: true });
  };

  const updateUser = async (dto: UpdateUserDataFull | UpdateUserDataBase) => {
    return await userService.updateUser(dto);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        fetchUser,
        updateUser,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
