import { GalleryList } from "@/modules/gallery/components/GalleryList.tsx";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { GalleryCreateForm } from "@/modules/gallery/components/GalleryCreateForm.tsx";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { PaginatorComponent } from "@/lib/paginator/PaginatorComponent.tsx";
import { useGalleries } from "@/modules/gallery/context.ts";

export const GalleriesPage = () => {
  const drawerService = useDrawerService();
  const {
    galleriesIsFetching,
    pageSize,
    totalPages,
    totalCount,
    onPageChangeHandler,
    isDrover,
    currentPage,
    handlePrev,
    handleNext,
  } = useGalleries();

  if (galleriesIsFetching) return <div>Loading...</div>;

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
          <GalleryList />
        </div>

        <div className={"p-2"}>
          {totalCount ? (
            <PaginatorComponent
              totalItems={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              totalPages={totalPages}
              onNextButtonClick={handleNext}
              onPrevButtonClick={handlePrev}
              onPageChangeHandler={onPageChangeHandler}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
