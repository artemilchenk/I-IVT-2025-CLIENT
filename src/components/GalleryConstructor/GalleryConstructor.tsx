import {
  Constructor,
  Draggable,
  DropContainer,
  ItemBlock,
} from "@/lib/constructor";
import { useMemo, useState } from "react";
import type { Container, Item } from "@/lib/constructor/types.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useGalleryClient } from "@/modules/gallery/hooks/useGalleryClient.ts";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";

const buildConstructorData = (
  galleries: IGalleryCreateResponse[] | undefined,
) => {
  return (
    galleries?.map((galleryItem) => {
      return {
        id: galleryItem.id,
        name: galleryItem.title,
        items:
          galleryItem.images?.map((photoItem) => ({
            id: photoItem.id,
            label: photoItem.originalFilename,
          })) || [],
      };
    }) || []
  );
};

export const GalleryConstructor = () => {
  const queryClient = useQueryClient();
  const galleryClient = useGalleryClient(queryClient);
  const galleries = galleryClient.getGalleriesData();

  const constructorData = useMemo(
    () => buildConstructorData(galleries),
    [galleries],
  );

  const [constructorDataState, setConstructorDataState] =
    useState<Container<Item>[]>(constructorData);

  const [activeItem, setActiveItem] = useState<Item | null>(null);

  return (
    <Constructor
      data={constructorData}
      setContainerData={setConstructorDataState}
      activeItem={activeItem}
      onDragEndAction={() => setActiveItem(null)}
      onDragStartAction={(found) => {
        setActiveItem(found);
      }}
    >
      <div className="grid grid-cols-3 w-full gap-4 p-6 h-full">
        {constructorDataState?.map((galleryItem) => {
          if (!galleryItem.items?.length) return;
          return (
            /* <GalleryContainer
              key={galleryItem.id}
              container={{
                id: galleryItem.id,
                name: galleryItem.title,
                items: galleryItem.images,
              }}
            />*/
            <DropContainer
              id={galleryItem.id}
              key={galleryItem.id}
              title={galleryItem.name}
            >
              {galleryItem.items.map((item) => (
                <Draggable
                  data={{ sourceContainerId: galleryItem.id }}
                  id={item.id}
                  key={item.id}
                >
                  <div className={"cursor-pointer"}>
                    <ItemBlock label={item.label || ""} />
                  </div>
                </Draggable>
              ))}
            </DropContainer>
          );
        })}
      </div>
    </Constructor>
  );
};
