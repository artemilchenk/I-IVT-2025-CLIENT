import { type FC, type ReactNode, useMemo, useState } from "react";
import { GalleriesContext } from "./context";
import { useFetchGalleries } from "@/modules/gallery/hooks/api/useGalleries.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { usePaginationData } from "@/lib/paginator/usePaginationData.ts";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";

interface Props {
  children: ReactNode;
}

const pageSize = 4;

export const GalleriesProvider: FC<Props> = ({ children }) => {
  const { isLoading: galleriesIsFetching, galleries } = useFetchGalleries();
  const drawerService = useDrawerService();

  const isDrover = useMemo(
    () => drawerService.checkDrawer(DrawerType.CREATE_GALLERY),
    [drawerService],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { totalPages, paginationItems } =
    usePaginationData<IGalleryCreateResponse>(
      galleries || [],
      pageSize,
      currentPage,
    );

  const isLastOnPage = useMemo(() => {
    if (!galleries?.length) return false;

    return galleries.length % pageSize === 1;
  }, [galleries]);

  const decrementPageBy = (step: number) => {
    setCurrentPage((prev) => Math.max(prev - step, 1));
  };

  const incrementPageBy = (step: number) => {
    setCurrentPage((prev) => Math.min(prev + step, totalPages));
  };

  const handlePrev = () => {
    decrementPageBy(1);
  };

  const handleNext = () => {
    incrementPageBy(1);
  };

  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <GalleriesContext.Provider
      value={{
        galleries,
        galleriesIsFetching,
        isLastOnPage,
        paginationItems,
        pageSize,
        totalPages,
        currentPage,
        isDrover,
        handlePrev,
        handleNext,
        onPageChangeHandler,
        decrementPageBy,
      }}
    >
      {children}
    </GalleriesContext.Provider>
  );
};
