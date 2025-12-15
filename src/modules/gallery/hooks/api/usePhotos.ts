import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreatePhotoResponse } from "@/modules/gallery/types.ts";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";

export const useFetchPhotos = (galleryId: string) => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const { isLoading, data: photos } = useQuery<CreatePhotoResponse[]>({
    queryKey: ["photos", galleryId],
    queryFn: () => galleryClient.fetchPhotos(galleryId),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { isLoading, photos };
};
