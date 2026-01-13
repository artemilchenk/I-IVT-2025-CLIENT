import type { IGalleriesResponse } from "@/modules/gallery/types.ts";
import { type Container, MultiContainerDnD } from "@/lib/dnd";
import { DroppableContainer } from "@/lib/dnd/dc.tsx";
import { DraggableItem } from "@/lib/dnd/di.tsx";
import { GalleryContainer } from "@/modules/gallery/components/GalleryContainer.tsx";
import { GalleryMultiContainerDnD } from "@/modules/gallery/components/GalleryMultiContainerDnD.tsx";
import { useGalleries } from "@/modules/gallery/context.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const GalleryList = () => {
  const queryClient = useQueryClient();
  const { currentPage, galleries } = useGalleries();

  const onDataChange = (newData: Container[]) => {
    if (!newData) return;

    queryClient.setQueriesData(
      { queryKey: ["galleries", currentPage] },
      (prev: IGalleriesResponse) =>
        prev
          ? {
              ...prev,
              data: newData.map((container) => {
                const { items, ...rest } = container;
                return { ...rest, images: items };
              }),
            }
          : prev,
    );
  };

  const dndData = useMemo(() => {
    return (
      galleries.map((container) => {
        const { images, ...rest } = container;
        return {
          ...rest,
          items:
            images?.map((imageItem) => {
              return {
                ...imageItem,
                label: imageItem.originalFilename,
              };
            }) || [],
        };
      }) || []
    );
  }, [galleries]);

  return (
    <MultiContainerDnD
      onChange={onDataChange}
      data={dndData}
      render={({ containers }) => (
        <GalleryMultiContainerDnD>
          {containers.map((container) => (
            <DroppableContainer key={container.id} container={container}>
              <GalleryContainer container={container}>
                {container.items.map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    sourceContainerId={container.id}
                  >
                    <div className="dnd-item p-2 bg-green-200 min-h-30">
                      {item.label}
                    </div>
                  </DraggableItem>
                ))}
              </GalleryContainer>
            </DroppableContainer>
          ))}
        </GalleryMultiContainerDnD>
      )}
    />
  );
};
