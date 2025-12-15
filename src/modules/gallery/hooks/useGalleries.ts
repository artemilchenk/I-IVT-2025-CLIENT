import { useQuery } from "@tanstack/react-query";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";

export const useFetchGalleries = () => {
  const galleryClient = useGalleryClient();

  const { isLoading, data: galleries } = useQuery<IGalleryCreateResponse[]>({
    queryKey: ["galleries"],
    queryFn: galleryClient.fetchGalleries,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { isLoading, galleries };
};
