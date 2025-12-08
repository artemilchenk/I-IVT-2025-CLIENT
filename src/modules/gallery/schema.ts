import { z } from "zod";
import { stringMinMaxSchema } from "@/constants";

export const baseGallerySchema = z.object({
  title: stringMinMaxSchema(2, 50),
  description: stringMinMaxSchema(2, 255),
});

export const createGallerySchema = baseGallerySchema;
export const updateGallerySchema = baseGallerySchema.partial();
