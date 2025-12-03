import { type FC, useMemo, useRef } from "react";
import { HeaderComponent } from "@/components/Header/Component.tsx";
import { Outlet } from "react-router";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { useDrawer } from "@/features/drawer/store";
import { NavMobile } from "@/router/component/NavMobile.tsx";
import { DrawerService } from "@/features/drawer/service";
import { DrawerType } from "@/constants/drawer.ts";

export const AppLayout: FC = () => {
  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  return (
    <div className={"h-full overflow-hidden "}>
      <HeaderComponent />

      <div className="relative flex flex-col w-full h-full items-center p-2">
        <Outlet />
        <div className={"md:hidden"}>
          <DrawerComponent
            isOpen={!!drawerService.checkDrawer(DrawerType.NAV)}
            onClose={() => drawerService.closeDrawer(DrawerType.NAV)}
          >
            <div className={"p-2"}>
              <div className={"flex justify-center"}>
                <div className={"w-2xl"}>
                  <NavMobile />
                </div>
              </div>
            </div>
          </DrawerComponent>
        </div>
      </div>
    </div>
  );
};
