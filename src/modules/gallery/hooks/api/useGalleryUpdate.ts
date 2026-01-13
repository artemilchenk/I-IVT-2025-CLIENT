import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";

import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useGalleryUpdate = () => {
  const queryClient = useQueryClient();
  const drawerService = useDrawerService();

  const mutation = useMutation<
    IGalleryCreateResponse,
    Error,
    { dto: TBaseGallery; id: string }
  >({
    mutationFn: galleryApi.updateGallery,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["gallery", variables.id],
      });
      drawerService.closeDrawer(DrawerType.GALLERY_INFO);
      toast.success("Gallery successfully updated!");
    },
    onError: (error) => {
      handleError(error, "Update gallery error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
