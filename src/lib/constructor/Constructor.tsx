import { type FC, useMemo } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ItemBlock } from "./ItemBlock";
import type { ConstructorProps, Item } from "./types";

export const Constructor: FC<ConstructorProps<Item>> = ({
  data,
  onDragStartAction,
  onDragEndAction,
  activeItem,
  setContainerData,
  children,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const allItems = useMemo(() => data.flatMap((obj) => obj.items), [data]);

  const onDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;

    const found = allItems.find((i) => i.id === id);
    if (!found) return;

    onDragStartAction(found);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const dataCopy = [...data];
    const { active, over } = event;

    const draggableData = active.data.current as { sourceContainerId: string };

    const activeItemId: string = active.id + "";
    const targetContainerId: string = over?.id + "" || "";
    const sourceContainerId: string =
      draggableData.sourceContainerId + "" || "";

    if (targetContainerId === sourceContainerId) return;

    onDragEndAction();

    if (!over) return;

    const item = allItems.find((i) => i.id === activeItemId);

    if (!item) return;

    const targetContainer = dataCopy.find((c) => c.id === targetContainerId);
    const sourceContainer = dataCopy.find((c) => c.id === sourceContainerId);

    if (!targetContainer || !sourceContainer) return;

    const targetContainerIndex = dataCopy.findIndex(
      (c) => c.id === targetContainerId,
    );

    const sourceContainerItems = sourceContainer.items.filter(
      (i) => i.id !== activeItemId,
    );

    targetContainer.items = [...targetContainer.items, item];
    sourceContainer.items = sourceContainerItems;

    if (targetContainerIndex !== -1) {
      dataCopy[targetContainerIndex] = targetContainer;
    }

    setContainerData(dataCopy);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}

      <DragOverlay>
        {activeItem ? (
          <ItemBlock label={activeItem?.label || ""} dragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
