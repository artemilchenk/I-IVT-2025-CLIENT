import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import { useDrawer } from "@/features/drawer/store";
import { useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { DrawerType } from "@/constants/drawer.ts";

export const useGalleryUpdate = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

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
