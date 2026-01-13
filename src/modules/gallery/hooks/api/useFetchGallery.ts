import { useQuery } from "@tanstack/react-query";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useFetchGallery = (id: string) => {
  const { isLoading, data: gallery } = useQuery<IGalleryCreateResponse>({
    queryKey: ["gallery", id],
    queryFn: () => galleryApi.fetchGallery(id),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { isLoading, gallery };
};
