import type { DrawerState, TDrawerType } from "@/features/drawer/types.ts";

export class DrawerService {
  private readonly drawerState: DrawerState;
  constructor(drawerState: DrawerState) {
    this.drawerState = drawerState;
  }

  checkDrawer(currentDrawer: TDrawerType, parentId?: string) {
    const isId = !!this.drawerState.parentsId.find(
      (parentItem) => parentItem === parentId,
    );

    const isType = !!this.drawerState.drawers.find(
      (drawer) => drawer === currentDrawer,
    );

    if (parentId) return isId && isType;

    return isType;
  }

  openDrawer(type: TDrawerType, parentId?: string) {
    if (parentId) {
      this.drawerState.setParentIds([...this.drawerState.parentsId, parentId]);
      this.drawerState.setDrawers([...this.drawerState.drawers, type]);
    }
    this.drawerState.setDrawers([...this.drawerState.drawers, type]);
  }

  closeDrawer(type: TDrawerType, parentId?: string) {
    const index = this.drawerState.drawers.indexOf(type);
    if (index === -1) return this.drawerState.drawers;

    if (parentId) {
      this.drawerState.setParentIds(
        this.drawerState.parentsId.filter(
          (parentItemId) => parentId !== parentItemId,
        ),
      );
    }

    this.drawerState.setDrawers([
      ...this.drawerState.drawers.slice(0, index),
      ...this.drawerState.drawers.slice(index + 1),
    ]);
  }
}
