import { ROUTES } from "@/constants/router.ts";
import type { TTabRout } from "@/components/Header/types.ts";

export const tabRoutes: TTabRout[] = [
  {
    label: "Galleries",
    value: "galleries",
    path: ROUTES.GALLERIES.path,
    isAuth: true,
  },
  {
    label: "Profile",
    value: "profile",
    path: ROUTES.PROFILE.path,
    isAuth: true,
  },
  { label: "Home", value: "home", path: ROUTES.HOME.path, isAuth: false },
];
