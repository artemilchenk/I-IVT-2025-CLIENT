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
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { httpClient } from "@/services/httpClient.ts";
import { DragOverlay } from "@dnd-kit/core";

export const GalleryList = () => {
  const { galleries } = useGalleries();
  const { mutation } = usePhotoMove({
    onSuccess: () => {},
  });

  const onDataChange = (event: DataChangeEvent) => {
    if (!event.data) return;

    const optimisticData = event.data.map((container) => {
      const { items, ...rest } = container;
      return {
        ...rest,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        images: items.map(({ title: _, ...rest }) => rest),
      } as IGalleryCreateResponse;
    });

    mutation.mutate({
      id: event.activeItemId,
      targetContainerId: event.targetContainerId,
      optimisticData,
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
                title: imageItem.originalFilename,
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
      renderOverlay={({ activeItem }) => (
        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                width: "auto",
                height: "200px",
                overflow: "hidden",
              }}
              className="dnd-item p-2 bg-green-200 shadow-lg min-h-30"
            >
              {activeItem.title}
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                // @ts-ignore
                src={`${httpClient.baseUrl}${activeItem.path}`}
                alt=""
              />
            </div>
          ) : null}
        </DragOverlay>
      )}
      render={({ containers }) => (
        <GalleryMultiContainerDnD>
          {containers.map((container) => (
            <DroppableContainer key={container.id} container={container}>
              <GalleryContainer container={container}>
                {container.items.map((item) => {
                  return (
                    <DraggableItem
                      key={item.id}
                      item={item}
                      sourceContainerId={container.id}
                    >
                      <div
                        style={{
                          width: "auto",
                          height: "200px",
                          overflow: "hidden",
                        }}
                        className="dnd-item p-2 bg-green-200 min-h-30"
                      >
                        {item.title}
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          // @ts-ignore
                          src={`${httpClient.baseUrl}${item.path}`}
                          alt=""
                        />
                      </div>
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
