import type { UserState } from "@/modules/user/types.ts";
import { updateUserForModes } from "@/modules/user/constants.ts";

export class UserFormService {
  private readonly userState: UserState;
  constructor(userState: UserState) {
    this.userState = userState;
  }

  switchBaseMode() {
    this.userState.setMode(updateUserForModes.BASE);
  }

  switchFullMode() {
    this.userState.setMode(updateUserForModes.FULL);
  }
}
