import { createContext, useContext } from "react";
import type { GalleryContextType } from "@/modules/gallery/types.ts";

export const GalleriesContext = createContext<GalleryContextType | null>(null);
export const useGalleries = () => {
  const ctx = useContext(GalleriesContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
