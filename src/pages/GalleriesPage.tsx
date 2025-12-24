import { GalleryList } from "@/modules/gallery/components/GalleryList.tsx";
import { useMemo, useState } from "react";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";
import { useFetchGalleries } from "@/modules/gallery/hooks/api/useGalleries.ts";
import { ItemPaginator } from "@/lib/paginator";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const GalleriesPage = () => {
  const { isLoading, galleries } = useFetchGalleries();

  const drawerService = useDrawerService();

  const isDrover = useMemo(
    () => drawerService.checkDrawer(DrawerType.CREATE_GALLERY),
    [drawerService],
  );

  const [paginationItems, setPaginationItems] = useState<
    IGalleryCreateResponse[]
  >([]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-2 w-full h-[calc(100vh-150px)]">
      <button
        onClick={() => {
          drawerService.openDrawer(DrawerType.CREATE_GALLERY);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Add Gallery
      </button>

      <div className={`relative w-full overflow-hidden flex flex-col h-full`}>
        <DrawerComponent
          index={DrawerIndexes.CREATE_GALLERY}
          isOpen={isDrover}
          onClose={() => drawerService.closeDrawer(DrawerType.CREATE_GALLERY)}
        >
          <div className={"flex justify-center items-center w-full p-5"}>
            <GalleryCreateForm className={"w-2xl"} />
          </div>
        </DrawerComponent>
        <div className={"w-full h-full overflow-scroll"}>
          {galleries?.length ? <GalleryList items={paginationItems} /> : null}
        </div>

        <div className={"p-2"}>
          {galleries?.length ? (
            <ItemPaginator
              data={galleries}
              onPaginatorChange={(items) => {
                setPaginationItems(items);
              }}
              pageSize={4}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
