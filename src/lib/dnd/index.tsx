import { type ReactNode, useEffect, useState } from "react";

export type DataChangeEvent<TContainer> = {
  data: TContainer[];
  activeItemId: string;
  targetContainerId: string;
};

import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export function MultiContainerDnD<
  TContainer extends { id: string },
  TItem extends { id: string },
>({
  render,
  renderOverlay,
  data,
  onChange,
  getItems,
  setItems,
}: {
  data: TContainer[];
  render: (args: { containers: TContainer[] }) => ReactNode;
  renderOverlay: (args: { activeItem: TItem | null }) => ReactNode;
  onChange: (event: DataChangeEvent<TContainer>) => void;
  getItems: (container: TContainer) => TItem[];
  setItems: (container: TContainer, items: TItem[]) => TContainer;
}) {
  const [activeItem, setActiveItem] = useState<TItem | null>(null);
  const [localData, setLocalData] = useState<TContainer[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const findContainerByItemId = (itemId: string) => {
    return localData.find((container) =>
      getItems(container).some((item) => item.id === itemId),
    );
  };

  const findContainerById = (containerId: string) => {
    return localData.find((container) => container.id === containerId);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveItem(active.data.current?.item ?? null);
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const activeItemId = active.id as string;
    const overId = over.id as string;

    const sourceContainer = findContainerByItemId(activeItemId);

    const targetContainer =
      findContainerById(overId) ?? findContainerByItemId(overId);

    if (!sourceContainer || !targetContainer) return;

    if (sourceContainer.id === targetContainer.id) return;

    const item = getItems(sourceContainer).find((i) => i.id === activeItemId);

    if (!item) return;

    const newData = localData.map((container) => {
      if (container.id === sourceContainer.id) {
        return setItems(
          container,
          getItems(container).filter((i) => i.id !== activeItemId),
        );
      }

      if (container.id === targetContainer.id) {
        return setItems(container, [...getItems(container), item]);
      }

      return container;
    });

    setLocalData(newData);
    onChange({
      data: newData,
      activeItemId,
      targetContainerId: overId,
    });
    setActiveItem(null);
  };

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      {render({ containers: localData })}
      {renderOverlay({ activeItem })}
    </DndContext>
  );
}
