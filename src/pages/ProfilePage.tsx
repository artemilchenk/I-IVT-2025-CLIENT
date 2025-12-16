import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button.tsx";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { AvatarIcon } from "@/components/ui/User.tsx";
import { UpdateUserForm } from "@/modules/user/components/UpdateUserForm.tsx";
import { ProfileInfoPage } from "@/components/ProfileInfoPage.tsx";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export const ProfilePage = () => {
  const drawerService = useDrawerService();

  return (
    <Card className={"w-2/3 relative overflow-hidden h-fit"}>
      <DrawerComponent
        isOpen={drawerService.checkDrawer(DrawerType.EDIT_PROFILE)}
        onClose={() => drawerService.closeDrawer(DrawerType.EDIT_PROFILE)}
      >
        <div
          className={"flex justify-center w-full overflow-scroll h-full p-2"}
        >
          <div className={"w-1/2 "}>
            <UpdateUserForm />
          </div>
        </div>
      </DrawerComponent>
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
          <ProfileInfoPage />
        </div>
      </CardContent>
    </Card>
  );
};
