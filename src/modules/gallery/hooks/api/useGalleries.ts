import { useQuery } from "@tanstack/react-query";
import type { IGalleriesResponse } from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useFetchGalleries = (page: number) => {
  const { isLoading, data } = useQuery<IGalleriesResponse, Error>({
    queryKey: ["galleries", page],
    queryFn: () => galleryApi.fetchGalleries(page),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });

  return {
    isLoading,
    response: data,
  };
};
