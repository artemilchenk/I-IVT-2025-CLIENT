import {
  firstLastNameSchema,
  passwordSchema,
  signUpSchema,
} from "@/modules/auth/schema.ts";
import { z } from "zod";

export const UpdateUserSchemaBase = z.object({
  firstname: firstLastNameSchema,
  lastname: firstLastNameSchema,
  email: z.string().email("Invalid email"),
});

export const UpdateUserSchemaFull = signUpSchema.safeExtend({
  oldpassword: passwordSchema,
});
