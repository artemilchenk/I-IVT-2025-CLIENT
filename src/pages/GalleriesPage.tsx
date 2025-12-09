import { useFetchGalleries } from "@/modules/gallery/hooks/useGalleries.ts";
import { GalleryList } from "@/modules/gallery/components/GalleryList.tsx";
import { useDrawer } from "@/features/drawer/store";
import { useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { DrawerType } from "@/constants/drawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";

export const GalleriesPage = () => {
  const { isLoading } = useFetchGalleries();

  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  if (isLoading) return <div>Loading...</div>;

  const isDrover = drawerService.checkDrawer(DrawerType.CREATE_GALLERY);

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
        className={
          "relative overflow-hidden flex h-[calc(100vh-150px)] flex-col pb-5"
        }
      >
        <DrawerComponent
          isOpen={!!isDrover}
          onClose={() => drawerService.closeDrawer(DrawerType.CREATE_GALLERY)}
        >
          <div className={"flex justify-center w-full min-h-200 h-full p-2"}>
            <GalleryCreateForm />
          </div>
        </DrawerComponent>

        <GalleryList />
      </div>
    </div>
  );
};
