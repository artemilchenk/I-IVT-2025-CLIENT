import { NavDesktop } from "@/router/component/NavDesktop.tsx";
import { useAuth } from "@/modules/auth/context.ts";
import { Menu, X } from "lucide-react";
import { DrawerType } from "@/constants/drawer.ts";
import { DrawerService } from "@/features/drawer/service";
import { useDrawer } from "@/features/drawer/store";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button.tsx";
import { useQueryClient } from "@tanstack/react-query";

export const HeaderComponent = () => {
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["profile"]);

  const drawerStore = useDrawer();
  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  return (
    <header className="relative flex w-full bg-white shadow-md px-6 py-3">
      <div className={"mx-auto"}>
        <div className={"hidden md:block"}>
          <NavDesktop />
        </div>

        <div className="block md:hidden">
          {drawerService.checkDrawer(DrawerType.NAV) ? (
            <Button onClick={() => drawerService.closeDrawer(DrawerType.NAV)}>
              <X />
            </Button>
          ) : (
            <Button onClick={() => drawerService.openDrawer(DrawerType.NAV)}>
              <Menu />
            </Button>
          )}
        </div>
      </div>
      {!!user && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {user && <Button onClick={() => signOut()}>Sign Out</Button>}
        </div>
      )}
    </header>
  );
};
