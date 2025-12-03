import { create } from "zustand";
import type { DrawerState } from "@/features/drawer/types.ts";

export const useDrawer = create<DrawerState>()((set) => ({
  isDrawer: false,
  toggleDrawer: () => set((state) => ({ isDrawer: !state.isDrawer })),
}));
