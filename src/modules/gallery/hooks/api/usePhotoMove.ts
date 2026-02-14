import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  UploadPhotoResponse,
  IGalleriesResponse,
  PhotoMoveDto,
} from "@/modules/gallery/types.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";
import { useGalleries } from "@/modules/gallery/context.ts";

type RollbackContext = {
  previousData?: IGalleriesResponse;
};

export const usePhotoMove = ({ onSuccess }: { onSuccess: () => void }) => {
  const { currentPage } = useGalleries();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    UploadPhotoResponse,
    Error,
    PhotoMoveDto,
    RollbackContext
  >({
    mutationFn: galleryApi.movePhoto,
    onMutate: async (vars) => {
      await queryClient.cancelQueries({ queryKey: ["galleries", currentPage] });

      const previousData = queryClient.getQueryData<IGalleriesResponse>([
        "galleries",
        currentPage,
      ]);

      queryClient.setQueriesData(
        { queryKey: ["galleries", currentPage] },
        (prev: IGalleriesResponse) =>
          prev
            ? {
                ...prev,
                data: vars.data,
              }
            : prev,
      );

      return { previousData };
    },

    onSuccess: () => {
      onSuccess();
      mutation.reset();
      toast.success("Photo is successfully moved!");
    },
    onError: (error, _variables, context) => {
      handleError(error, "Move photo error");

      if (context?.previousData) {
        queryClient?.setQueryData(
          ["galleries", currentPage],
          context.previousData,
        );
      }
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
