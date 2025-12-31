import { useMemo } from "react";

export const usePaginationData = <T extends { id: string }>(
  items: T[],
  pageSize: number,
  currentPage: number,
) => {
  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginationItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [startIndex, endIndex, items],
  );

  return {
    startIndex,
    endIndex,
    totalPages,
    paginationItems,
  };
};
