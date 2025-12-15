import { usePaginationData } from "@/lib/paginator/usePaginationData.ts";
import { PaginatorComponent } from "@/lib/paginator/PaginatorComponent.tsx";
import { useEffect } from "react";

export const ItemPaginator = <T extends { id: string }>({
  data,
  onPaginatorChange,
  pageSize,
}: {
  data: T[];
  onPaginatorChange: (items: T[]) => void;
  pageSize: number;
}) => {
  const { totalPages, paginationItems, currentPage, setCurrentPage } =
    usePaginationData<T>(data || [], pageSize);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    onPaginatorChange(paginationItems);
  }, [paginationItems, onPaginatorChange]);

  return (
    <PaginatorComponent
      totalItems={data?.length || 0}
      currentPage={currentPage}
      pageSize={pageSize}
      totalPages={totalPages}
      onNextButtonClick={handleNext}
      onPrevButtonClick={handlePrev}
      onPageChangeHandler={onPageChangeHandler}
    />
  );
};
