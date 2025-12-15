import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  CreatePhotoResponse,
  PhotoInput,
} from "@/modules/gallery/types.ts";

export const usePhotoCreate = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const mutation = useMutation<
    CreatePhotoResponse,
    Error,
    PhotoInput & { galleryId: string }
  >({
    mutationFn: galleryClient.createPhoto,
    onSuccess: (data) => {
      console.log({ data });
      toast.success("New photo successfully created!");
    },
    onError: (error) => {
      handleError(error, "Create photo error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
