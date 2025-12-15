import { useDraggable } from "@dnd-kit/core";
import type { DraggableData } from "@/lib/constructor/types.ts";

export const Draggable = ({
  id,
  children,
  data,
}: {
  id: string;
  children: React.ReactNode;
  data: DraggableData;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
