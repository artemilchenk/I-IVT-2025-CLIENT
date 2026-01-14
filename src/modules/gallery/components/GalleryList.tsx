import {
  type Container,
  type DataChangeEvent,
  MultiContainerDnD,
} from "@/lib/dnd";
import { DroppableContainer } from "@/lib/dnd/dc.tsx";
import { DraggableItem } from "@/lib/dnd/di.tsx";
import { GalleryContainer } from "@/modules/gallery/components/GalleryContainer.tsx";
import { GalleryMultiContainerDnD } from "@/modules/gallery/components/GalleryMultiContainerDnD.tsx";
import { useGalleries } from "@/modules/gallery/context.ts";
import { useMemo } from "react";
import { usePhotoMove } from "@/modules/gallery/hooks/api/usePhotoMove.ts";

export const GalleryList = () => {
  const { galleries } = useGalleries();
  const { mutation } = usePhotoMove({
    onSuccess: () => {},
  });

  const onDataChange = (event: DataChangeEvent) => {
    if (!event.data) return;

    mutation.mutate({
      id: event.activeItemId,
      targetContainerId: event.targetContainerId,
      optimisticData: event.data,
    });
  };

  const dndData: Container[] = useMemo(() => {
    return (
      galleries.map((container) => {
        const { images, ...rest } = container;
        return {
          ...rest,
          items:
            images?.map((imageItem) => {
              return {
                ...imageItem,
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
                      {item.title}
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
