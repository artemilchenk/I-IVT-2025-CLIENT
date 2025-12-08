import type { FormSchema, TFormType } from "@/features/form/types.ts";

export const FormType = {
  GALLERY: "gallery",
} as const;

export const FormMap: Record<TFormType, FormSchema> = {
  [FormType.GALLERY]: { type: FormType.GALLERY, mode: "create" },
};
