import type { DrawerType } from "@/constants/drawer.ts";

export interface DrawerState {
  drawers: TDrawerType[];
  setDrawers: (drawers: TDrawerType[]) => void;
}

export type TDrawerType = (typeof DrawerType)[keyof typeof DrawerType];
