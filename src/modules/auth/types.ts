import { z } from "zod";
import { signInSchema, signUpSchema } from "@/modules/auth/schema.ts";

export interface UserCore {
  email: string;
  password: string;
}

export interface User extends UserCore {
  firstname: string;
  lastname: string;
}

export interface SignUpUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AuthContextType {
  signUp: (value: User) => Promise<SignUpResponseData | undefined>;
  signIn: (value: UserCore) => Promise<SignUpResponseData | undefined>;
  signOut: () => void;
  getUserData: () => SignUpResponseData;
}

export interface SignUpResponseData {
  user: SignUpUserResponse;
  access_token: string;
}

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
