import { create } from "zustand";
import type { UpdateUserFormMode, UserState } from "@/modules/user/types.ts";
import { updateUserForModes } from "@/modules/user/constants.ts";

export const useUserFormStore = create<UserState>()((set) => ({
  mode: updateUserForModes.BASE,
  setMode: (value: UpdateUserFormMode) => set(() => ({ mode: value })),
}));
