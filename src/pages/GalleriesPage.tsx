import { useFetchGalleries } from "@/modules/gallery/hooks/useGalleries.ts";
import { GalleryList } from "@/modules/gallery/components/GalleryList.tsx";
import { useDrawer } from "@/features/drawer/store";
import { useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { DrawerType } from "@/constants/drawer.ts";

export const GalleriesPage = () => {
  const { isLoading, galleries } = useFetchGalleries();

  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  if (isLoading) return <div>Loading...</div>;

  if (!galleries?.length) return <div>There is no any gallery here.</div>;

  return (
    <div className="w-full p-6 max-w-4xl mx-auto">
      <button
        onClick={() => {
          drawerService.openDrawer(DrawerType.CREATE_GALLERY);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Add Item
      </button>
      <div
        className={"flex h-[calc(100vh-150px)] overflow-scroll flex-col pb-5"}
      >
        <GalleryList />
      </div>
    </div>
  );
};
