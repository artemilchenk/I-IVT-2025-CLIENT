import { type ReactNode, useEffect, useState } from "react";

export type Item = {
  id: string;
  label: string;
};

export type Container = {
  id: string;
  title: string;
  items: Item[];
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
}: {
  data: Container[];
  render: (args: { containers: Container[] }) => ReactNode;
}) {
  const [containers, setContainers] = useState<Container[]>(data);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

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

    const sourceContainer = findContainerByItemId(containers, activeItemId);
    const targetContainer =
      findContainerById(containers, overId) ??
      findContainerByItemId(containers, overId);

    if (!sourceContainer || !targetContainer) return;
    if (sourceContainer.id === targetContainer.id) return;

    setContainers((prev) => {
      const item = sourceContainer.items.find((i) => i.id === activeItemId)!;

      return prev.map((container) => {
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
    });
    setActiveItem(null);
  };

  useEffect(() => {
    setContainers(data);
  }, [data]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      {render({ containers })}

      <DragOverlay>
        {activeItem ? (
          <div className="dnd-item p-2 bg-green-200 shadow-lg min-h-30">
            {activeItem.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
