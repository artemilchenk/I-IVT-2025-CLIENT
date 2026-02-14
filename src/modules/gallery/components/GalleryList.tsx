import { type DataChangeEvent, MultiContainerDnD } from "@/lib/dnd";
import { DroppableContainer } from "@/lib/dnd/dc.tsx";
import { DraggableItem } from "@/lib/dnd/di.tsx";
import { GalleryContainer } from "@/modules/gallery/components/GalleryContainer.tsx";
import { GalleryMultiContainerDnD } from "@/modules/gallery/components/GalleryMultiContainerDnD.tsx";
import { useGalleries } from "@/modules/gallery/context.ts";
import { usePhotoMove } from "@/modules/gallery/hooks/api/usePhotoMove.ts";
import type {
  IGalleryCreateResponse,
  UploadPhotoResponse,
} from "@/modules/gallery/types.ts";
import { DragOverlay } from "@dnd-kit/core";
import { GalleryPhotoItem } from "@/modules/gallery/components/GalleryPhotoItem.tsx";

export const GalleryList = () => {
  const { galleries } = useGalleries();
  const { mutation } = usePhotoMove({
    onSuccess: () => {},
  });

  const onDataChange = (event: DataChangeEvent<IGalleryCreateResponse>) => {
    if (!event.data) return;

    mutation.mutate({
      id: event.activeItemId,
      targetContainerId: event.targetContainerId,
      data: event.data,
    });
  };

  return (
    <MultiContainerDnD<IGalleryCreateResponse, UploadPhotoResponse>
      getItems={(g) => g.images ?? []}
      setItems={(g, images) => ({ ...g, images })}
      onChange={onDataChange}
      data={galleries}
      renderOverlay={({ activeItem }) => (
        <DragOverlay>
          {activeItem ? (
            <GalleryPhotoItem item={activeItem} isDragOverlay={true} />
          ) : null}
        </DragOverlay>
      )}
      render={({ containers }) => (
        <GalleryMultiContainerDnD>
          {containers.map((container) => (
            <DroppableContainer key={container.id} container={container}>
              <GalleryContainer container={container}>
                {container.images?.map((item) => {
                  return (
                    <DraggableItem
                      key={item.id}
                      item={item}
                      sourceContainerId={container.id}
                    >
                      <GalleryPhotoItem item={item} />
                    </DraggableItem>
                  );
                })}
              </GalleryContainer>
            </DroppableContainer>
          ))}
        </GalleryMultiContainerDnD>
      )}
    />
  );
};
