import type { DrawerState, TDrawerType } from "@/features/drawer/types.ts";

export class DrawerService {
  private readonly drawerState: DrawerState;
  constructor(drawerState: DrawerState) {
    this.drawerState = drawerState;
  }

  checkDrawer(currentDrawer: TDrawerType) {
    return this.drawerState.drawers.find((drawer) => drawer === currentDrawer);
  }

  openDrawer(type: TDrawerType) {
    this.drawerState.setDrawers([...this.drawerState.drawers, type]);
  }

  closeDrawer(type: TDrawerType) {
    this.drawerState.setDrawers(
      this.drawerState.drawers.filter((drawer) => drawer !== type),
    );
  }
}
