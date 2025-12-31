import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { Container } from "@/lib/dnd/index.tsx";

export function DroppableContainer({
  container,
  children,
}: {
  container: Container;
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
