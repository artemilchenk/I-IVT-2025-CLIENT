class TokenService {
  constructor() {}

  getToken() {
    const value = localStorage.getItem("token");
    if (!value) throw new Error("Token not found");
    return value;
  }
}

export const tokenService = new TokenService();
