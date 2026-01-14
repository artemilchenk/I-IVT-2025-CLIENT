import { type ReactNode, useEffect, useState } from "react";

export type Item = {
  id: string;
  title?: string;
};

export type Container = {
  id: string;
  items: Item[];
  title?: string;
};

export type DataChangeEvent = {
  data: Container[];
  activeItemId: string;
  targetContainerId: string;
};

function findContainerByItemId(containers: Container[], itemId: string) {
  return containers.find((c) => c.items.some((item) => item.id === itemId));
}

function findContainerById(containers: Container[], containerId: string) {
  return containers.find((c) => c.id === containerId);
}

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export function MultiContainerDnD({
  render,
  data,
  onChange,
}: {
  data: Container[];
  render: (args: { containers: Container[] }) => ReactNode;
  onChange: (event: DataChangeEvent) => void;
}) {
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [localData, setLocalData] = useState<Container[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

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

    const sourceContainer = findContainerByItemId(data, activeItemId);
    const targetContainer =
      findContainerById(data, overId) ?? findContainerByItemId(data, overId);

    if (!sourceContainer || !targetContainer) return;
    if (sourceContainer.id === targetContainer.id) return;

    const item = sourceContainer.items.find((i) => i.id === activeItemId)!;

    const newData = localData.map((container) => {
      if (container.id === sourceContainer.id) {
        return {
          ...container,
          items: container.items.filter((i) => i.id !== activeItemId),
        };
      }

      if (container.id === targetContainer.id) {
        return {
          ...container,
          items: [...container.items, item],
        };
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

      <DragOverlay>
        {activeItem ? (
          <div className="dnd-item p-2 bg-green-200 shadow-lg min-h-30">
            {activeItem.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
