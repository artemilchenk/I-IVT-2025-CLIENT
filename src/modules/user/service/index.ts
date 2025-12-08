import type { SignUpUserResponse } from "@/modules/auth/types.ts";
import { httpClient } from "@/services/httpClient.ts";
import axios from "axios";
import type {
  UpdateUserDataBase,
  UpdateUserDataFull,
} from "@/modules/user/types.ts";

export class UserService {
  constructor() {}

  async getUser(): Promise<SignUpUserResponse> {
    const token = localStorage.getItem("token");

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

  async updateUser(
    dto: UpdateUserDataFull | UpdateUserDataBase,
  ): Promise<SignUpUserResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.post<SignUpUserResponse>(
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
