import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const DropContainer = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 h-full transition ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};
