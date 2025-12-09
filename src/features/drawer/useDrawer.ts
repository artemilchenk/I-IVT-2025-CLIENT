import { useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { useDrawer } from "@/features/drawer/store";

export const useDrawerService = () => {
  const drawerStore = useDrawer();
  return useMemo(() => new DrawerService(drawerStore), [drawerStore]);
};
