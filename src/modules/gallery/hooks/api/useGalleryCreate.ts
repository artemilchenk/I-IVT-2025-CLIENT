import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/sheared";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { galleryApi } from "@/modules/gallery/GalleryApi.ts";

export const useGalleryCreate = ({
  onCreateSuccess,
}: {
  onCreateSuccess: () => void;
}) => {
  const drawerService = useDrawerService();

  const mutation = useMutation<IGalleryCreateResponse, Error, TBaseGallery>({
    mutationFn: galleryApi.createGallery,
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
