import { Tabs, TabsList } from "@/components/ui/tabs.tsx";
import { tabRoutes } from "@/mocks/components/header.ts";
import { NavLink } from "react-router";
import { useDrawer } from "@/features/drawer/store";

export const NavMobile = () => {
  const { toggleDrawer } = useDrawer();
  return (
    <Tabs>
      <TabsList className="bg-gray-100 flex flex-col gap-3 h-fit w-full">
        {tabRoutes.map((tab) => (
          <NavLink
            onClick={() => toggleDrawer()}
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
