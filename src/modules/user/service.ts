import type { SignUpUserResponse } from "@/modules/auth/types.ts";
import { httpClient } from "@/services/httpClient.ts";
import axios from "axios";
import type { UpdateUserData } from "@/modules/user/types.ts";

export class UserService {
  constructor() {}

  async getUser(): Promise<SignUpUserResponse> {
    const token = localStorage.getItem("token"); // or your Zustand store

    const response = await axios.get<SignUpUserResponse>(
      `${httpClient.baseUrl}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async updateUser(dto: UpdateUserData): Promise<SignUpUserResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.patch<SignUpUserResponse>(
      `${httpClient.baseUrl}/profile`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
}

export const userService = new UserService();
