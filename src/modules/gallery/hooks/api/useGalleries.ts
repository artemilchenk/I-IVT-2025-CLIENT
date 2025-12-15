import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";

export const useFetchGalleries = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

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
