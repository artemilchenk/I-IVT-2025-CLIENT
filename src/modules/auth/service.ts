import type {
  SignUpResponseData,
  User,
  UserCore,
} from "@/modules/auth/types.ts";
import { httpClient } from "@/services/httpClient.ts";
import axios from "axios";

export class AuthService {
  constructor() {}

  async signUp(value: User): Promise<SignUpResponseData> {
    const response = await axios.post<SignUpResponseData>(
      `${httpClient.baseUrl}/auth/sign-up`,
      value,
    );

    return response.data;
  }

  async signIn(value: UserCore): Promise<SignUpResponseData> {
    const response = await axios.post<SignUpResponseData>(
      `${httpClient.baseUrl}/auth/sign-in`,
      value,
    );

    return response.data;
  }
}

export const authService = new AuthService();
