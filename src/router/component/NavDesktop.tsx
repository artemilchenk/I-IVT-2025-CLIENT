import { Tabs, TabsList } from "@/components/ui/tabs.tsx";
import { tabRoutes } from "@/mocks/components/header.ts";
import { NavLink } from "react-router";

export const NavDesktop = () => (
  <Tabs>
    <TabsList className="rounded-full bg-gray-100 flex gap-6">
      {tabRoutes.map((tab) => (
        <NavLink
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
