import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { AnimatePresence } from "framer-motion";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawer } from "@/features/drawer/store";
import { useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";
import { GalleryItem } from "@/modules/gallery/components/GalleryItem.tsx";
import { useQueryClient } from "@tanstack/react-query";

export const GalleryList = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const galleries = galleryClient.getGalleriesData();

  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  if (!galleries) return null;

  return (
    <div className=" w-full  relative grid grid-cols-1 sm:grid-cols-2 gap-4">
      <DrawerComponent
        isOpen={!!drawerService.checkDrawer(DrawerType.CREATE_GALLERY)}
        onClose={() => drawerService.closeDrawer(DrawerType.CREATE_GALLERY)}
      >
        <div
          className={"flex justify-center w-full overflow-scroll h-full p-2"}
        >
          <div className={"w-1/2"}>
            <GalleryCreateForm />
          </div>
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
