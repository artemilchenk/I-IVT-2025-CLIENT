import type { HTMLInputTypeAttribute } from "react";
import { FormType } from "@/constants/form.ts";

export interface FormControl<T> {
  id: number;
  name: T;
  title: string;
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
}

export interface FormState {
  forms: TFormType[];
  setForms: (forms: TFormType[]) => void;
}

export type TFormType = (typeof FormType)[keyof typeof FormType];
