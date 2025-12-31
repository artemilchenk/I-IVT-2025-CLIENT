import { useMemo } from "react";
import { GalleryClient } from "@/modules/gallery/GalleryClient.ts";
import { type QueryClient } from "@tanstack/react-query";

export const useGalleryClient = (value: QueryClient) => {
  return useMemo(() => new GalleryClient(value), [value]);
};
