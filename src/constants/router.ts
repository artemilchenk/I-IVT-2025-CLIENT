import { route } from "@/router/utils.ts";

export const ROUTES = {
  AUTH: {
    ROOT: route("/auth"),
    SIGN_IN: route("/auth/sign-in"),
    SIGN_UP: route("/auth/sign-up"),
  },

  PROFILE: route("/profile"),
  GALLERIES: route("/galleries"),
  HOME: route("/"),
} as const;
