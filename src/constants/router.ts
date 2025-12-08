import { route } from "@/router/utils.ts";

export const ROUTES = {
  AUTH: {
    ROOT: route("/auth"),
    SIGN_IN: route("/auth/sign-in"),
    SIGN_UP: route("/auth/sign-up"),
  },

  PROFILE: route("/profile"),
  GALLERIES: route("/galleries"),
  GALLERY_ID: (id: string) => route(`/gallery/${id}`),
  GALLERY: route("/gallery/:id"),
  HOME: route("/"),
} as const;
