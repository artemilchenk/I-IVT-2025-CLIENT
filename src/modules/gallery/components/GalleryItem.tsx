import { motion } from "framer-motion";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { type FC } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

interface Props {
  item: IGalleryCreateResponse;
  isDeleteActive: boolean;
}

export const GalleryItem: FC<Props> = ({ item, isDeleteActive }) => {
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
      className="p-4"
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{item.description}</p>

      <button
        onClick={(event) => {
          event.stopPropagation();
          drawerService.openDrawer(DrawerType.GALLERY_DELETE, item.id);
        }}
        disabled={isDeleteActive}
        className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </motion.div>
  );
};
