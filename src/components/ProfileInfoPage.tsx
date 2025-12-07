import { Label } from "@/components/ui/label.tsx";
import { useQueryClient } from "@tanstack/react-query";
import type { SignUpUserResponse } from "@/modules/auth/types.ts";

export const ProfileInfoPage = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<SignUpUserResponse>(["profile"]);

  return (
    <div className="w-full grid grid-cols-1 gap-4 text-center">
      <div>
        <Label className="text-muted-foreground text-sm grid text-center">
          First Name
        </Label>
        <p className="text-lg font-medium">{user?.firstname}</p>
      </div>

      <div>
        <Label className="text-muted-foreground text-sm grid text-center">
          Last Name
        </Label>
        <p className="text-lg font-medium">{user?.lastname}</p>
      </div>

      <div>
        <Label className="text-muted-foreground text-sm grid text-center">
          Email
        </Label>
        <p className="text-lg font-medium">{user?.email}</p>
      </div>
    </div>
  );
};
