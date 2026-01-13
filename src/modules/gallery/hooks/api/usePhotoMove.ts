import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  CreatePhotoResponse,
  IGalleriesResponse,
  PhotoMoveDto,
} from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

type RollbackContext = {
  previousData?: IGalleriesResponse;
};

export const usePhotoMove = ({ onSuccess }: { onSuccess: () => void }) => {
  /* const { currentPage } = useGalleries();
  const queryClient = useQueryClient();*/
  const mutation = useMutation<
    CreatePhotoResponse,
    Error,
    PhotoMoveDto,
    RollbackContext
  >({
    mutationFn: galleryApi.movePhoto,
    /*  onMutate: async (newGalleryData) => {
      await queryClient.cancelQueries({ queryKey: ["galleries", currentPage] });

         const previousData = queryClient.getQueryData<IGalleriesResponse>([
        "galleries",
        currentPage,
      ]);

      queryClient.setQueryData(
        ["galleries", currentPage],
        (prev: IGalleriesResponse) => {
          if (!prev) return prev;
          return {
            ...prev,
            data: newGalleryData,
          };
        },
      );

      return { previousData };
    },*/

    onSuccess: () => {
      onSuccess();
      mutation.reset();
      toast.success("Photo is successfully moved!");
    },
    onError: (error /*_variables, context*/) => {
      handleError(error, "Move photo error");

      /*  if (context?.previousData) {
        queryClient?.setQueryData(
          ["galleries", currentPage],
          context.previousData,
        );
      }*/
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
