import type { ReactNode } from "react";

export type Item = { id: string; label?: string };

export interface Container<T> {
  id: string;
  name: string;
  items: T[];
}

export interface ConstructorProps<T extends Item> {
  activeItem: T | null;
  data: Container<T>[];
  onDragStartAction: (item: T) => void;
  onDragEndAction: () => void;
  setContainerData: (data: Container<T>[]) => void;
  children: ReactNode;
}

export type DraggableData = {
  sourceContainerId: string;
};
