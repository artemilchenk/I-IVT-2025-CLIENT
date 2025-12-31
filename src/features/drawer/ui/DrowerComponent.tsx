import { forwardRef, type ReactNode } from "react";

interface FullWidthSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  index?: number;
  children?: ReactNode;
}

export const DrawerComponent = forwardRef<HTMLDivElement, FullWidthSheetProps>(
  ({ isOpen, children, index }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gray-100 absolute inset-0 w-full h-full transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1px)]"
        }`}
        style={{ zIndex: index }}
      >
        {children}
      </div>
    );
  },
);
