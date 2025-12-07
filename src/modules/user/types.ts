import type { SignInData, SignUpData } from "@/modules/auth/types.ts";
import type { FormControl } from "@/features/form/types.ts";
import { z } from "zod";
import type { ValueOf } from "@/sheared";
import {
  UpdateUserSchemaBase,
  type UpdateUserSchemaFull,
} from "@/modules/user/schema.ts";
import type { updateUserForModes } from "@/modules/user/constants.ts";

export type UserLoginFormControlNames = keyof SignInData;
export type UserLoginFormControl = FormControl<UserLoginFormControlNames>;

export type UserCreateFormControlNames = keyof SignUpData;
export type UserCreateFormControl = FormControl<UserCreateFormControlNames>;
export type UpdateUserFormControlNames = keyof UpdateUserDataFull;
export type UpdateUserFormControl = FormControl<UpdateUserFormControlNames>;
export type UpdateUserDataFull = z.infer<typeof UpdateUserSchemaFull>;
export type UpdateUserDataBase = z.infer<typeof UpdateUserSchemaBase>;

export interface UserState {
  mode: UpdateUserFormMode;
  setMode: (value: UpdateUserFormMode) => void;
}

export type UpdateUserFormMode = ValueOf<typeof updateUserForModes>;
