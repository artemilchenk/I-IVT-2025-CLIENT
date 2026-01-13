import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  CreatePhotoResponse,
  PhotoInput,
} from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const usePhotoCreate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreatePhotoResponse,
    Error,
    PhotoInput & { galleryId: string }
  >({
    mutationFn: galleryApi.createPhoto,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["galleries"],
      });
      toast.success("New photo successfully created!");
    },
    onError: (error) => {
      handleError(error, "Create photo error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
