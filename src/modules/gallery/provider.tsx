import { type FC, type ReactNode, useMemo } from "react";
import { GalleriesContext } from "./context";
import { useFetchGalleries } from "@/modules/gallery/hooks/api/useGalleries.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { usePageParam } from "@/modules/gallery/hooks/usePageParam.ts";

interface Props {
  children: ReactNode;
}

const pageSize = 4;

export const GalleriesProvider: FC<Props> = ({ children }) => {
  const drawerService = useDrawerService();

  const isDrover = useMemo(
    () => drawerService.checkDrawer(DrawerType.CREATE_GALLERY),
    [drawerService],
  );
  const { page, setPage } = usePageParam();
  const { isLoading: galleriesIsFetching, response } = useFetchGalleries(page);

  const isLastOnPage = useMemo(() => response?.data.length === 1, [response]);
  const isFullPage = useMemo(
    () => response?.data.length === response?.meta.limit,
    [response],
  );

  const totalPages = useMemo(() => {
    if (!response) return 1;

    return Math.ceil(response.meta.total / response.meta.limit);
  }, [response]);

  const decrementPageBy = (step: number) => {
    setPage(Math.max(page - step, 1));
  };

  const incrementPageBy = (step: number) => {
    setPage(Math.max(page + step, totalPages));
  };

  const handlePrev = () => {
    decrementPageBy(1);
  };

  const handleNext = () => {
    incrementPageBy(1);
  };

  const onPageChangeHandler = (page: number) => {
    setPage(page);
  };

  return (
    <GalleriesContext.Provider
      value={{
        galleries: response?.data || [],
        galleriesIsFetching,
        isLastOnPage,
        isFullPage,
        pageSize,
        totalPages,
        totalCount: response?.meta.total || 0,
        currentPage: page,
        isDrover,
        handlePrev,
        handleNext,
        onPageChangeHandler,
        decrementPageBy,
        incrementPageBy,
      }}
    >
      {children}
    </GalleriesContext.Provider>
  );
};
