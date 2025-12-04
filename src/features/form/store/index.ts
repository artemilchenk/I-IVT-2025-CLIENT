import { create } from "zustand";
import type { FormState } from "@/features/form/types.ts";

export const useFormStore = create<FormState>()((set) => ({
  forms: [],
  setForms: (newForms) => set(() => ({ forms: newForms })),
}));
