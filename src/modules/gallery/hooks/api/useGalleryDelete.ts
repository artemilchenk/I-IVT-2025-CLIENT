import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";

export const useGalleryDelete = ({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);

  const mutation = useMutation({
    mutationFn: galleryClient.deleteGallery,
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
