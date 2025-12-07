import { useUserFormStore } from "@/modules/user/form/store";
import { UserFormService } from "@/modules/user/form/service/insex.ts";
import { useMemo } from "react";

export const useUserForm = () => {
  const formStore = useUserFormStore();

  const userFormService = useMemo(
    () => new UserFormService(formStore),
    [formStore],
  );

  return { userFormService, mode: formStore.mode, formStore };
};
