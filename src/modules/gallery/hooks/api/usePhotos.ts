import { useQuery } from "@tanstack/react-query";
import type { CreatePhotoResponse } from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useFetchPhotos = (galleryId: string) => {
  const { isLoading, data: photos } = useQuery<CreatePhotoResponse[]>({
    queryKey: ["photos", galleryId],
    queryFn: () => galleryApi.fetchPhotos(galleryId),
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { isLoading, photos };
};
