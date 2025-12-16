import Pagination from "rc-pagination";
import enUS from "rc-pagination/lib/locale/en_US";
import { type FC } from "react";
import type { PaginatorComponentProps } from "@/lib/paginator/types.ts";

export const PaginatorComponent: FC<PaginatorComponentProps> = ({
  totalItems,
  pageSize,
  currentPage,
  totalPages,
  onPrevButtonClick,
  onNextButtonClick,
  onPageChangeHandler,
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Pagination
        locale={enUS}
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={onPageChangeHandler}
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        className="my-pagination flex justify-center"
        itemRender={(_page, type, originalElement) => {
          if (type === "prev") {
            return (
              <button
                onClick={onPrevButtonClick}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-40"
              >
                Prev
              </button>
            );
          }
          if (type === "next") {
            return (
              <button
                onClick={onNextButtonClick}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-40"
              >
                Next
              </button>
            );
          }
          return (
            <div className="h-full grid items-center ">{originalElement}</div>
          );
        }}
      />
    </div>
  );
};
