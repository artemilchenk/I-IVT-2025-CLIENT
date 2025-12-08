import { z } from "zod";
import { type baseGallerySchema } from "@/modules/gallery/schema.ts";

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

export type TBaseGallery = z.infer<typeof baseGallerySchema>;

export interface IGalleryCreateResponse extends TBaseGallery {
  id: string;
  createdAt: Date;
  user: { id: number };
}

//export interface IGalleryUpdateResponse extends IGalleryCreateResponse {}

export type GalleryPutFormControlNames = keyof TBaseGallery;
export type GalleryPutFormControl = FormControl<GalleryPutFormControlNames>;
