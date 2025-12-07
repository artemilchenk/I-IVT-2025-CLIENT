import type { UpdateUserFormMode } from "@/modules/user/types.ts";
import {
  UpdateUserSchemaBase,
  UpdateUserSchemaFull,
} from "@/modules/user/schema.ts";
import { updateUserForModes } from "@/modules/user/constants.ts";

export const getSchemaForMode = (mode: UpdateUserFormMode) => {
  return mode === updateUserForModes.BASE
    ? UpdateUserSchemaBase
    : UpdateUserSchemaFull;
};
