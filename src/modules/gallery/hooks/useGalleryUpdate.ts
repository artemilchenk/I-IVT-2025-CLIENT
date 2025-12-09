import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";

import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const useGalleryUpdate = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const drawerService = useDrawerService();

  const mutation = useMutation<
    IGalleryCreateResponse,
    Error,
    { dto: TBaseGallery; id: string }
  >({
    mutationFn: galleryClient.updateGallery,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["user", variables.id]);
      drawerService.closeDrawer(DrawerType.GALLERY_INFO);
      toast.success("Gallery successfully updated!");
    },
    onError: (error) => {
      handleError(error, "Update gallery error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
