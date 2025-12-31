import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const GalleryMultiContainerDnD = ({ children }: Props) => {
  return (
    <div className="dnd grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {children}
    </div>
  );
};
