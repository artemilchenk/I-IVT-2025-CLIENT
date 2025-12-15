import type { DrawerType } from "@/constants/drawer.ts";

export interface Drawer {
  type: TDrawerType;
  parentsId: string[];
}

export interface DrawerState {
  drawers: Drawer[];
  setDrawers: (drawers: Drawer[]) => void;
}

export type TDrawerType = (typeof DrawerType)[keyof typeof DrawerType];
