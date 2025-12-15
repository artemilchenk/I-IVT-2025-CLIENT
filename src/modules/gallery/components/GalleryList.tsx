import { AnimatePresence } from "framer-motion";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { GalleryItem } from "@/modules/gallery/components/GalleryItem.tsx";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { motion } from "framer-motion";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { ConfirmPrompt } from "@/components/ConfirmPrompt.tsx";
import { useGalleryDelete } from "@/modules/gallery/hooks/api/useGalleryDelete.ts";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import type { FC } from "react";

interface Props {
  items: IGalleryCreateResponse[];
}

export const GalleryList: FC<Props> = ({ items }) => {
  const drawerService = useDrawerService();
  const { isLoading, mutation } = useGalleryDelete();

  return (
    <div
      className={`w-full grid items-center justify-center grid-cols-1 sm:grid-cols-2 gap-4`}
    >
      <AnimatePresence>
        {items?.map((item) => (
          <motion.div key={item.id}>
            <div
              className={
                "relative overflow-hidden shadow hover:shadow-md transition cursor-pointer rounded-2xl border border-gray-100"
              }
            >
              <DrawerComponent
                index={DrawerIndexes.GALLERY_DELETE}
                isOpen={drawerService.checkDrawer(
                  DrawerType.GALLERY_DELETE,
                  item.id,
                )}
              >
                <ConfirmPrompt
                  text={"Delete this gallery?"}
                  onConfirm={() => mutation.mutate(item.id)}
                  onCancel={() => {
                    drawerService.closeDrawer(
                      DrawerType.GALLERY_DELETE,
                      item.id,
                    );
                  }}
                />
              </DrawerComponent>

              <GalleryItem
                isDeleteActive={isLoading}
                key={item.id}
                item={item}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
