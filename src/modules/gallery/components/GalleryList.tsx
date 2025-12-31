import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { type FC, useMemo } from "react";
import { MultiContainerDnD } from "@/lib/dnd";
import { DroppableContainer } from "@/lib/dnd/dc.tsx";
import { DraggableItem } from "@/lib/dnd/di.tsx";
import { GalleryContainer } from "@/modules/gallery/components/GalleryContainer.tsx";
import { GalleryMultiContainerDnD } from "@/modules/gallery/components/GalleryMultiContainerDnD.tsx";

interface Props {
  items: IGalleryCreateResponse[];
  onDeleteSuccess: () => void;
}

export const GalleryList: FC<Props> = ({ items, onDeleteSuccess }) => {
  const dndData = useMemo(() => {
    return (
      items?.map((container) => {
        return {
          id: container.id,
          title: container.title,
          items:
            container.images?.map((imageItem) => ({
              id: imageItem.id,
              label: imageItem.originalFilename,
            })) || [],
        };
      }) || []
    );
  }, [items]);

  return (
    <MultiContainerDnD
      data={dndData}
      render={({ containers }) => (
        <GalleryMultiContainerDnD>
          {containers.map((container) => (
            <DroppableContainer key={container.id} container={container}>
              <GalleryContainer
                onDeleteSuccess={onDeleteSuccess}
                container={container}
              >
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
