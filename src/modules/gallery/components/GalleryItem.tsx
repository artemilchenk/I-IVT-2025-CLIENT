import { motion } from "framer-motion";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { type FC } from "react";
import { useGalleryDelete } from "@/modules/gallery/hooks/useGalleryDelete.ts";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";
import { ConfirmPrompt } from "@/components/ConfirmPrompt.tsx";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";

interface Props {
  item: IGalleryCreateResponse;
}

export const GalleryItem: FC<Props> = ({ item }) => {
  const { isLoading, mutation } = useGalleryDelete();
  const navigate = useNavigate();
  const drawerService = useDrawerService();

  return (
    <motion.div
      onClick={() => navigate(ROUTES.GALLERY_ID(item.id).path)}
      key={item.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25 }}
      className="p-4 shadow rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer"
    >
      <DrawerComponent
        index={DrawerIndexes.GALLERY_DELETE}
        isOpen={drawerService.checkDrawer(DrawerType.GALLERY_DELETE, item.id)}
      >
        <ConfirmPrompt
          text={"Delete this gallery?"}
          onConfirm={() => mutation.mutate(item.id)}
          onCancel={() => {
            drawerService.closeDrawer(DrawerType.GALLERY_DELETE, item.id);
          }}
        />
      </DrawerComponent>

      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{item.description}</p>

      <button
        onClick={(event) => {
          event.stopPropagation();
          drawerService.openDrawer(DrawerType.GALLERY_DELETE, item.id);
        }}
        disabled={isLoading}
        className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </motion.div>
  );
};
