import { GalleryList } from "@/modules/gallery/components/GalleryList.tsx";
import { useDrawer } from "@/features/drawer/store";
import { useMemo, useState } from "react";
import { DrawerService } from "@/features/drawer/service";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";
import { useFetchGalleries } from "@/modules/gallery/hooks/api/useGalleries.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";
import { ItemPaginator } from "@/lib/paginator";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";

export const GalleriesPage = () => {
  const { isLoading } = useFetchGalleries();
  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  const isDrover = useMemo(
    () => drawerService.checkDrawer(DrawerType.CREATE_GALLERY),
    [drawerService],
  );

  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const galleries = galleryClient.getGalleriesData();
  const [paginationItems, setPaginationItems] = useState<
    IGalleryCreateResponse[]
  >([]);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full p-6 max-w-4xl mx-auto">
      <button
        onClick={() => {
          drawerService.openDrawer(DrawerType.CREATE_GALLERY);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Add Gallery
      </button>

      <div className={`relative overflow-hidden flex flex-col pb-5`}>
        <DrawerComponent
          index={DrawerIndexes.CREATE_GALLERY}
          isOpen={isDrover}
          onClose={() => drawerService.closeDrawer(DrawerType.CREATE_GALLERY)}
        >
          <div className={"flex justify-center items-center w-full p-5"}>
            <GalleryCreateForm className={"w-full"} />
          </div>
        </DrawerComponent>

        <div>
          <div className={"p-2"}>
            {galleries?.length && (
              <ItemPaginator
                data={galleries}
                onPaginatorChange={(items) => {
                  setPaginationItems(items);
                }}
                pageSize={4}
              />
            )}
          </div>
          <div className={`overflow-${isDrover ? "hidden" : "scroll"}`}>
            {galleries?.length && <GalleryList items={paginationItems} />}
          </div>
        </div>
      </div>
    </div>
  );
};
