import { useGalleryClient } from "@/modules/gallery/hooks/useGaleryService.ts";
import { AnimatePresence } from "framer-motion";
import { DrawerType } from "@/constants/drawer.ts";
import { GalleryItem } from "@/modules/gallery/components/GalleryItem.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { motion } from "framer-motion";
import { useState } from "react";
import { PaginationComponent } from "@/components/PaginationComponent.tsx";

export const GalleryList = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const galleries = galleryClient.getGalleriesData();
  const drawerService = useDrawerService();

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  if (!galleries) return null;

  const totalPages = Math.ceil(galleries.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleGalleries = galleries.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
    //if (size) setPageSize(size);
  };

  const isDrover = drawerService.checkDrawer(DrawerType.CREATE_GALLERY);

  return (
    <div>
      <div className={"p-2"}>
        <PaginationComponent
          totalItems={galleries.length}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          onNextButtonClick={handleNext}
          onPrevButtonClick={handlePrev}
          onPageChangeHandler={onPageChangeHandler}
        />
      </div>

      <div
        className={`w-full relative h-fit grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-${isDrover ? "hidden" : "scroll"}`}
      >
        <AnimatePresence>
          {visibleGalleries?.map((item) => (
            <motion.div
              key={item.id}
              className={"relative overflow-hidden h-38"}
            >
              <GalleryItem key={item.id} item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
