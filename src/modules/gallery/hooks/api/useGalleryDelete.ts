import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useGalleryDelete = ({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) => {
  const mutation = useMutation({
    mutationFn: galleryApi.deleteGallery,
    onSuccess: () => {
      toast.success("Successfully deleted!");
      onDeleteSuccess();
    },
    onError: (error) => {
      handleError(error, "Delete gallery error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
