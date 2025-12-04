import { z } from "zod";
import { signInSchema, signUpSchema } from "@/modules/auth/schema.ts";
import type { UpdateUserData } from "@/modules/user/types.ts";

export interface UserCore {
  email: string;
  password: string;
}

export interface SignUpUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AuthContextType {
  user: SignUpUserResponse | null;
  signUp: (value: SignUpData) => void;
  signIn: (value: SignInData) => void;
  signOut: () => void;
  fetchUser: () => void;
  updateUser: (value: UpdateUserData) => void;
}

export interface SignUpResponseData {
  user: SignUpUserResponse;
  access_token: string;
}

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
