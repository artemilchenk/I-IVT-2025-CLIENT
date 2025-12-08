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

export const useGalleryCreate = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  const mutation = useMutation<IGalleryCreateResponse, Error, TBaseGallery>({
    mutationFn: galleryClient.createGallery,
    onSuccess: (data) => {
      galleryClient.setGalleriesData([
        ...(galleryClient.getGalleriesData() || []),
        data,
      ]);
      mutation.reset();
      drawerService.closeDrawer(DrawerType.CREATE_GALLERY);
      toast.success("New gallery successfully created!");
    },
    onError: (error) => {
      handleError(error, "Create gallery error");
    },
  });

  return { isLoading: mutation.isPending, data: mutation.data, mutation };
};
