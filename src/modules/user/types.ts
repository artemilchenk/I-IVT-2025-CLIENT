import type { SignInData, SignUpData } from "@/modules/auth/types.ts";
import type { FormControl } from "@/features/form/types.ts";

export type UserCreateFormControlNames = keyof SignUpData;
export type UserLoginFormControlNames = keyof SignInData;
export type UserCreateFormControl = FormControl<UserCreateFormControlNames>;
export type UserLoginFormControl = FormControl<UserLoginFormControlNames>;
export type UpdateUserData = SignUpData & { oldpassword: string };
