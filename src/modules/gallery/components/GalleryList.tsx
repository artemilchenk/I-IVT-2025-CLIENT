import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { AnimatePresence } from "framer-motion";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";
import { GalleryItem } from "@/modules/gallery/components/GalleryItem.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const GalleryList = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const galleries = galleryClient.getGalleriesData();

  const drawerService = useDrawerService();

  if (!galleries) return null;

  const isDrover = drawerService.checkDrawer(DrawerType.CREATE_GALLERY);

  return (
    <div
      className={`w-full relative grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-${isDrover ? "hidden" : "scroll"}`}
    >
      <DrawerComponent
        isOpen={!!isDrover}
        onClose={() => drawerService.closeDrawer(DrawerType.CREATE_GALLERY)}
      >
        <div className={"flex justify-center w-full min-h-200 h-full p-2"}>
          <GalleryCreateForm />
        </div>
      </DrawerComponent>

      <AnimatePresence>
        {galleries?.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};
