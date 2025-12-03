import { forwardRef, type ReactNode } from "react";

interface FullWidthSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const DrawerComponent = forwardRef<HTMLDivElement, FullWidthSheetProps>(
  ({ isOpen, onClose, children }, ref) => {
    return (
      <>
        {/* Backdrop */}
        <div
          className={`absolute h-full bg-black/50 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />

        {/* Sheet content */}
        <div
          ref={ref}
          className={`absolute top-0 left-0 h-full w-full bg-gray-400 shadow-xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {children}
        </div>
      </>
    );
  },
);
