import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button.tsx";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { useDrawer } from "@/features/drawer/store";
import { DrawerType } from "@/constants/drawer.ts";
import { DrawerService } from "@/features/drawer/service";
import { useMemo } from "react";
import { AvatarIcon } from "@/components/ui/User.tsx";

export const ProfilePage = () => {
  const profile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: null,
  };
  const drawerStore = useDrawer();

  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  return (
    <Card className={"w-2/3 max-w-3xl relative overflow-hidden"}>
      <DrawerComponent
        isOpen={!!drawerService.checkDrawer(DrawerType.EDIT_PROFILE)}
        onClose={() => drawerService.closeDrawer(DrawerType.EDIT_PROFILE)}
      ></DrawerComponent>
      <CardHeader className={"flex justify-between"}>
        <CardTitle className="text-lg">Profile</CardTitle>
        <div>
          <Button
            onClick={() => drawerService.openDrawer(DrawerType.EDIT_PROFILE)}
            size={"sm"}
          >
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <AvatarIcon />
          <div className="w-full grid grid-cols-1 gap-4 text-center">
            <div>
              <Label className="text-muted-foreground text-sm grid text-center">
                First Name
              </Label>
              <p className="text-lg font-medium">{profile.firstName}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm grid text-center">
                Last Name
              </Label>
              <p className="text-lg font-medium">{profile.lastName}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm grid text-center">
                Email
              </Label>
              <p className="text-lg font-medium">{profile.email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
