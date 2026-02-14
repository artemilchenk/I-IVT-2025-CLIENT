import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

export function DroppableContainer<TContainer extends { id: string }>({
  container,
  children,
}: {
  container: TContainer;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? "#f0f9ff" : "#fafafa",
      }}
    >
      {children}
    </div>
  );
}
