import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { useGalleryDelete } from "@/modules/gallery/hooks/api/useGalleryDelete.ts";
import type { IGalleryCreateResponse } from "@/modules/gallery/types.ts";
import { type FC, useMemo } from "react";
import { type Container, MultiContainerDnD } from "@/pages/test";
import { DroppableContainer } from "@/pages/test/dc.tsx";
import { DraggableItem } from "@/pages/test/di.tsx";

const initialContainers: Container[] = [
  {
    id: "c1",
    title: "Container 1",
    items: [
      { id: "i1", label: "Item 1" },
      { id: "i2", label: "Item 2" },
      { id: "i3", label: "Item 3" },
      { id: "i4", label: "Item 4" },
      { id: "i5", label: "Item 5" },
      { id: "i6", label: "Item 6" },
      { id: "i7", label: "Item 7" },
      { id: "i8", label: "Item 8" },
    ],
  },
  {
    id: "c2",
    title: "Container 2",
    items: [{ id: "i9", label: "Item 9" }],
  },
  {
    id: "c3",
    title: "Container 3",
    items: [],
  },
];

interface Props {
  items: IGalleryCreateResponse[];
}

export const GalleryList: FC<Props> = ({ items }) => {
  //const drawerService = useDrawerService();
  //const { isLoading, mutation } = useGalleryDelete();

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
      initialData={dndData}
      render={({ containers }) => (
        <div className="dnd grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {containers.map((container) => (
            <DroppableContainer key={container.id} container={container}>
              <div className={"overflow-scroll max-h-80"}>
                <div className="dnd-container border border-red-200 p-5 flex flex-col gap-3 h-full min-h-80">
                  {container.items.map((item) => (
                    <DraggableItem
                      key={item.id}
                      item={item}
                      sourceContainerId={container.id}
                    >
                      <div className="dnd-item p-2 bg-green-200">
                        {item.label}
                      </div>
                    </DraggableItem>
                  ))}
                </div>
              </div>
            </DroppableContainer>
          ))}
        </div>
      )}
    />
  );
};
