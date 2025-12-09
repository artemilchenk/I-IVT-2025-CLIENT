import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { AnimatePresence } from "framer-motion";
import { DrawerType } from "@/constants/drawer.ts";
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
      className={`w-full relative h-fit grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-${isDrover ? "hidden" : "scroll"}`}
    >
      <AnimatePresence>
        {galleries?.map((item) => (
          <div className={"h-fit"}>
            <GalleryItem key={item.id} item={item} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
