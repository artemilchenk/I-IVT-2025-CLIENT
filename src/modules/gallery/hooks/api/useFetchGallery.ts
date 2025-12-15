import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";

export const useFetchGallery = (id: string) => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const { isLoading, data: gallery } = useQuery<IGalleryCreateResponse>({
    queryKey: ["gallery", id],
    queryFn: () => galleryClient.fetchGallery(id),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { isLoading, gallery };
};
