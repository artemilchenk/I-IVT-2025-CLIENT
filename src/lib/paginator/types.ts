export interface PaginatorComponentProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
  onPageChangeHandler: (page: number, size?: number) => void;
}
