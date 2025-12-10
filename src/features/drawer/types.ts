import type { DrawerType } from "@/constants/drawer.ts";

export interface DrawerState {
  parentsId: string[];
  drawers: TDrawerType[];
  setDrawers: (drawers: TDrawerType[]) => void;
  setParentIds: (parentsId: string[]) => void;
}

export type TDrawerType = (typeof DrawerType)[keyof typeof DrawerType];
