import { Tabs, TabsList } from "@/components/ui/tabs.tsx";
import { tabRoutes } from "@/mocks/components/header.ts";
import { NavLink } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { type FC, useMemo } from "react";
import type { TNavMode } from "@/router/types.ts";
import { cn } from "@/lib/utils.ts";
import { NavMode } from "@/constants/router.ts";

interface Props {
  mode: TNavMode;
  onClose?: () => void;
}

export const Nav: FC<Props> = ({ onClose, mode }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["profile"]);

  const modeStyle = useMemo(
    () => mode === NavMode.MOBILE && "flex-col",
    [mode],
  );

  const style = useMemo(
    () => cn("bg-gray-100 flex gap-3 h-fit w-full", modeStyle),
    [modeStyle],
  );

  return (
    <Tabs>
      <TabsList className={style}>
        {tabRoutes
          .filter((tab) => (user ? tab : !tab.isAuth))
          .map((tab) => (
            <NavLink
              onClick={() => onClose && onClose()}
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `block w-full h-full ${isActive ? "bg-white shadow-md" : "hover:bg-gray-200"} rounded-full px-4 py-1`
              }
            >
              {tab.label}
            </NavLink>
          ))}
      </TabsList>
    </Tabs>
  );
};
