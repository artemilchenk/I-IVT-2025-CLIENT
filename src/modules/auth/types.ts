import { z } from "zod";
import { signInSchema, signUpSchema } from "@/modules/auth/schema.ts";
import type {
  UpdateUserDataBase,
  UpdateUserDataFull,
} from "@/modules/user/types.ts";

export interface SignUpUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AuthContextType {
  signUp: (value: SignUpData) => Promise<SignUpUserResponse>;
  signIn: (value: SignInData) => Promise<SignUpUserResponse>;
  updateUser: (
    value: UpdateUserDataFull | UpdateUserDataBase,
  ) => Promise<SignUpUserResponse>;
  signOut: () => void;
  fetchUser: () => Promise<SignUpUserResponse>;
  isLoading: boolean;
  user: SignUpUserResponse | undefined;
}

export interface SignUpResponseData {
  user: SignUpUserResponse;
  access_token: string;
}

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
