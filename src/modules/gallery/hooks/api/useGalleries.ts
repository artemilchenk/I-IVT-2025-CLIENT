import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IGalleriesResponse } from "@/modules/gallery/types.ts";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";

export const useFetchGalleries = (page: number) => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const { isLoading, data } = useQuery<IGalleriesResponse, Error>({
    queryKey: ["galleries", page],
    queryFn: () => galleryClient.fetchGalleries(page),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });

  return {
    isLoading,
    response: data,
  };
};
