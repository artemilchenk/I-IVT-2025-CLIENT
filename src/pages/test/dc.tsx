import { useDroppable } from "@dnd-kit/core";
import type { Container } from "@/pages/test/index.tsx";
import type { ReactNode } from "react";

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
