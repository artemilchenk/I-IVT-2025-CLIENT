import { z } from "zod";

export const stringMinMaxSchema = (min: number, max: number) => {
  return z
    .string()
    .min(min, "This field name must be at least 2 characters")
    .max(max, "This field name must be at no longer 50 characters");
};
