import type { FC } from "react";
import { Route, Routes } from "react-router";
import { RegisterPage } from "@/pages/RegisterPage.tsx";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { ProfilePage } from "@/pages/ProfilePage.tsx";
import { GalleriesPage } from "@/pages/GalleriesPage.tsx";
import { ROUTES } from "@/constants/router.ts";
import { AppLayout } from "@/layout/app.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { AuthGuardPage } from "@/pages/AuthGuardPage.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { GalleryPage } from "@/pages/GalleryPage.tsx";
import { GalleriesProvider } from "@/modules/gallery/provider.tsx";

export const RouterComponent: FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* HOME ROUTE */}
        <Route path={"/"} element={<HomePage />} />

        {/* AUTH ROUTES */}
        <Route path={ROUTES.AUTH.ROOT.path}>
          <Route path={ROUTES.AUTH.SIGN_UP.path} element={<RegisterPage />} />
          <Route path={ROUTES.AUTH.SIGN_IN.path} element={<LoginPage />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<AuthGuardPage />}>
          <Route path={ROUTES.GALLERY.path} element={<GalleryPage />} />
          <Route
            path={ROUTES.GALLERIES.path}
            element={
              <GalleriesProvider>
                <GalleriesPage />
              </GalleriesProvider>
            }
          />
          <Route path={ROUTES.PROFILE.path} element={<ProfilePage />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
