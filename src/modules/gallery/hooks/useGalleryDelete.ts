import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";

export const useGalleryDelete = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const mutation = useMutation({
    mutationFn: galleryClient.deleteGallery,
    onSuccess: (data) => {
      toast.success("Successfully deleted!");
      galleryClient.setGalleriesData(
        (galleryClient.getGalleriesData() ?? []).filter(
          (gallery) => gallery.id !== data.id,
        ),
      );
    },
    onError: (error) => {
      handleError(error, "Delete gallery error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
