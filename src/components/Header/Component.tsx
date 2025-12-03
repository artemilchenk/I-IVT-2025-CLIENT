import { BaseButton } from "@/components/ui/Button.tsx";
import { NavDesktop } from "@/router/component/NavDesktop.tsx";
import { useAuth } from "@/modules/auth/context.ts";
import { Menu, X } from "lucide-react";
import { useDrawer } from "@/features/drawer/store";

export const HeaderComponent = () => {
  const { getUserData, signOut } = useAuth();
  const userData = getUserData();
  const { isDrawer, toggleDrawer } = useDrawer();

  return (
    <header className="relative flex w-full bg-white shadow-md px-6 py-3">
      <div className={"mx-auto"}>
        <div className={"hidden md:block"}>
          <NavDesktop />
        </div>

        <div className="block md:hidden">
          <BaseButton onClick={() => toggleDrawer()}>
            {isDrawer ? <X /> : <Menu />}
          </BaseButton>
        </div>
      </div>
      {userData?.user && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <BaseButton onClick={() => signOut()}>Sign Out</BaseButton>
        </div>
      )}
    </header>
  );
};
