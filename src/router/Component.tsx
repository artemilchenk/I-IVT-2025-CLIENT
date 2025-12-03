import type { FC } from "react";
import { Route, Routes } from "react-router";
import { RegisterPage } from "@/pages/RegisterPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { AuthProtectedRoute } from "@/pages/ProtectedRoutePage.tsx";
import { ProfilePage } from "@/pages/ProfilePage.tsx";
import { GalleriesPage } from "@/pages/GalleriesPage.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { ROUTES } from "@/constants/router.ts";
import { AppLayout } from "@/layout/app.tsx";
import { HomePage } from "@/pages/HomePage.tsx";

export const RouterComponent: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* AUTH ROUTES */}
        <Route path={"/"} element={<HomePage />} />
        <Route path={ROUTES.AUTH.ROOT.path}>
          <Route path={ROUTES.AUTH.SIGN_UP.path} element={<RegisterPage />} />
          <Route path={ROUTES.AUTH.SIGN_IN.path} element={<LoginPage />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<AuthProtectedRoute />}>
          <Route path={ROUTES.PROFILE.path} element={<ProfilePage />} />
          <Route path={ROUTES.GALLERIES.path} element={<GalleriesPage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
