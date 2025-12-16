import { useAuth } from "@/modules/auth/context.ts";
import { Menu, X } from "lucide-react";
import { DrawerType } from "@/constants/drawer.ts";
import { Button } from "@/components/ui/Button.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { useNavigate } from "react-router";
import { NavMode, ROUTES } from "@/constants/router.ts";
import { Nav } from "@/router/component/Nav.tsx";

export const HeaderComponent = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["profile"]);
  const drawerService = useDrawerService();

  return (
    <header className="relative flex w-full justify-center items-center bg-white shadow-md px-6 py-3 h-full">
      <div className={"mx-auto"}>
        <div className={"hidden md:block"}>
          <Nav
            onClose={() => drawerService.closeDrawer(DrawerType.NAV)}
            mode={NavMode.DESKTOP}
          />
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
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {user ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button
            onClick={() => {
              navigate(ROUTES.AUTH.SIGN_IN.path);
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
