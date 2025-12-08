import { useMemo } from "react";
import { GalleryClient } from "@/modules/gallery/service.ts";
import type { QueryClient } from "@tanstack/react-query";

export const useGalleryClient = (queryClient: QueryClient) => {
  return useMemo(() => new GalleryClient(queryClient), [queryClient]);
};
