import { type FC } from "react";
import { HeaderComponent } from "@/components/Header/Component.tsx";
import { Outlet } from "react-router";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { Nav } from "@/router/component/Nav.tsx";
import { NavMode } from "@/constants/router.ts";

export const AppLayout: FC = () => {
  const drawerService = useDrawerService();

  return (
    <div className={"h-full overflow-hidden"}>
      <HeaderComponent />
      <div className="relative flex flex-col w-full h-full items-center p-2">
        <Outlet />

        <div className={"md:hidden"}>
          <DrawerComponent
            index={50}
            isOpen={drawerService.checkDrawer(DrawerType.NAV)}
            onClose={() => drawerService.closeDrawer(DrawerType.NAV)}
          >
            <div className={"p-2"}>
              <div className={"flex justify-center"}>
                <div className={"w-2xl"}>
                  <Nav
                    mode={NavMode.MOBILE}
                    onClose={() => drawerService.closeDrawer(DrawerType.NAV)}
                  />
                </div>
              </div>
            </div>
          </DrawerComponent>
        </div>
      </div>
    </div>
  );
};
