import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

export function DraggableItem<TItem extends { id: string }>({
  item,
  sourceContainerId,
  children,
}: {
  item: TItem;
  sourceContainerId: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: {
        item,
        sourceContainerId,
      },
    });

  const style = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
    opacity: isDragging ? 0 : 1,
    cursor: "grab",
  };

  return (
    <div
      className={"h-fit"}
      onClick={(event) => {
        event.stopPropagation();
      }}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
