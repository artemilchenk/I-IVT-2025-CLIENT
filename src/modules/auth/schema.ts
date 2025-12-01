import { z } from "zod";

export const signUpSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "This field name must be at least 2 characters")
      .max(50, "This field name must be at no longer 50 characters"),
    lastname: z
      .string()
      .min(2, "This field name must be at least 2 characters")
      .max(50, "This field name must be at no longer 50 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
});
