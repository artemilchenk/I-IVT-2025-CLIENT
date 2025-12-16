import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { useGalleryDelete } from "@/modules/gallery/hooks/api/useGalleryDelete.ts";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { type FC, useEffect, useMemo, useState } from "react";
import type { Container, Item } from "@/lib/constructor/types.ts";
import { Constructor } from "@/lib/constructor";
import { GalleryContainer } from "@/components/GalleryConstructor/GalleryContainer.tsx";
import { GalleryItem } from "@/modules/gallery/components/GalleryItem.tsx";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { ConfirmPrompt } from "@/components/ConfirmPrompt.tsx";

interface Props {
  items: IGalleryCreateResponse[];
}

export const GalleryList: FC<Props> = ({ items }) => {
  const drawerService = useDrawerService();
  const { isLoading, mutation } = useGalleryDelete();

  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const constructorData = useMemo(() => {
    return (
      items?.map((galleryItem) => {
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
  }, [items]);

  const [constructorDataState, setConstructorDataState] =
    useState<Container<Item>[]>(constructorData);

  useEffect(() => {
    setConstructorDataState(constructorData);
  }, [constructorData]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full`}>
      <Constructor
        data={constructorData}
        setContainerData={setConstructorDataState}
        activeItem={activeItem}
        onDragEndAction={() => setActiveItem(null)}
        onDragStartAction={(found) => {
          setActiveItem(found);
        }}
      >
        {constructorDataState?.map((containerItem) => {
          //if (!containerItem.items.length) return;

          return (
            <div
              key={containerItem.id}
              className={
                "min-h-80 relative flex flex-col overflow-hidden shadow hover:shadow-md transition cursor-pointer rounded-2xl border border-gray-100"
              }
            >
              <GalleryItem
                isDeleteActive={isLoading}
                key={containerItem.id}
                item={containerItem}
              >
                <div className={"relative flex-1"}>
                  <GalleryContainer
                    key={containerItem.id}
                    containerItem={containerItem}
                  />
                </div>
              </GalleryItem>

              <DrawerComponent
                index={DrawerIndexes.GALLERY_DELETE}
                isOpen={drawerService.checkDrawer(
                  DrawerType.GALLERY_DELETE,
                  containerItem.id,
                )}
              >
                <ConfirmPrompt
                  text={"Delete this gallery?"}
                  onConfirm={() => mutation.mutate(containerItem.id)}
                  onCancel={() => {
                    drawerService.closeDrawer(
                      DrawerType.GALLERY_DELETE,
                      containerItem.id,
                    );
                  }}
                />
              </DrawerComponent>
            </div>
          );
        })}
      </Constructor>
    </div>
  );
};
