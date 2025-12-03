import type { FC } from "react";
import { HeaderComponent } from "@/components/Header/Component.tsx";
import { Outlet } from "react-router";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { useDrawer } from "@/features/drawer/store";
import { NavMobile } from "@/router/component/NavMobile.tsx";

export const AppLayout: FC = () => {
  const { isDrawer, toggleDrawer } = useDrawer();

  return (
    <div className={"h-full overflow-hidden "}>
      <HeaderComponent />

      <div className="flex h-full relative flex flex-col items-center p-2">
        <Outlet />
        <div className={"md:hidden"}>
          <DrawerComponent isOpen={isDrawer} onClose={() => toggleDrawer()}>
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
