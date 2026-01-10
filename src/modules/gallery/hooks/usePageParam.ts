import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

const DEFAULT_PAGE = 1;

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const raw = Number(searchParams.get("page"));
    return Number.isInteger(raw) && raw > 0 ? raw : DEFAULT_PAGE;
  }, [searchParams]);

  const setPage = useCallback(
    (page: number) => {
      setSearchParams({ page: String(page) }, { replace: true });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (!page) {
      setPage(DEFAULT_PAGE);
    }
  }, [page, setPage]);

  return { page, setPage };
};
