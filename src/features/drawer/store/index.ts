import { create } from "zustand";
import { type DrawerState } from "@/features/drawer/types.ts";

export const useDrawer = create<DrawerState>()((set) => ({
  parentsId: [],
  drawers: [],
  setDrawers: (newDrawers) => set(() => ({ drawers: newDrawers })),
  setParentIds: (ids: string[]) => set(() => ({ parentsId: ids })),
}));
