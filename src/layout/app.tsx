import { type FC, useMemo } from "react";
import { HeaderComponent } from "@/components/Header/Component.tsx";
import { Outlet } from "react-router";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { NavMobile } from "@/router/component/NavMobile.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const AppLayout: FC = () => {
  const drawerService = useDrawerService();

  return (
    <div className={"h-full overflow-hidden"}>
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
