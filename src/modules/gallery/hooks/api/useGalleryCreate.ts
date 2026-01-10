import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const useGalleryCreate = ({
  onCreateSuccess,
}: {
  onCreateSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const drawerService = useDrawerService();

  const mutation = useMutation<IGalleryCreateResponse, Error, TBaseGallery>({
    mutationFn: galleryClient.createGallery,
    onSuccess: () => {
      onCreateSuccess();
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
