import type {
  Drawer,
  DrawerState,
  TDrawerType,
} from "@/features/drawer/types.ts";

export class DrawerService {
  private readonly drawerState: DrawerState;
  constructor(drawerState: DrawerState) {
    this.drawerState = drawerState;
  }

  checkDrawer(type: TDrawerType, parentId?: string) {
    const drawer = this.findDrawer(type);
    if (!drawer) return false;

    if (!parentId) return !!drawer;

    return !!drawer.parentsId.find((itemId) => itemId === parentId);
  }

  findDrawer(type: TDrawerType) {
    return this.drawerState.drawers.find((drawer) => drawer.type === type);
  }

  openDrawer(type: TDrawerType, parentId?: string) {
    const drawer = this.findDrawer(type);
    let newDrawer: Drawer;

    if (!drawer) {
      newDrawer = { type, parentsId: parentId ? [parentId] : [] };
      this.drawerState.setDrawers([...this.drawerState.drawers, newDrawer]);
    } else {
      if (parentId) {
        const newParentsId = [...drawer.parentsId, parentId];
        newDrawer = { ...drawer, parentsId: newParentsId };
        const drawersWithoutOld = this.drawerState.drawers.filter(
          (itemDrawer) => itemDrawer.type !== drawer.type,
        );
        this.drawerState.setDrawers([...drawersWithoutOld, newDrawer]);
      }
    }
  }

  closeDrawer(type: TDrawerType, parentId?: string) {
    const drawer = this.findDrawer(type);
    if (!drawer) return;

    const drawerIndex = this.drawerState.drawers.indexOf(drawer);

    if (!parentId) {
      this.drawerState.setDrawers(
        this.drawerState.drawers.filter((drawer) => drawer.type !== type),
      );
    } else {
      const newDrawer: Drawer = {
        ...drawer,
        parentsId: drawer.parentsId.filter((item) => item !== parentId),
      };
      const newDrawers = this.drawerState.drawers.map((item, i) =>
        i === drawerIndex ? newDrawer : item,
      );
      this.drawerState.setDrawers(newDrawers);
    }
  }
}
