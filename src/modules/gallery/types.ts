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
  user?: { id: number };
  images?: CreatePhotoResponse[];
}

export type GalleryPutFormControlNames = keyof TBaseGallery;
export type GalleryPutFormControl = FormControl<GalleryPutFormControlNames>;

export interface PhotoInput {
  buffer: string;
}

export interface CreatePhotoResponse {
  id: string;
  path: string;
  galleryId: string;
  originalFilename: string;
  createdAt: Date;
}

export interface GalleryContextType {
  galleries: IGalleryCreateResponse[] | undefined;
  galleriesIsFetching: boolean;
  paginationItems: IGalleryCreateResponse[];
  isDrover: boolean;
  pageSize: number;
  totalPages: number;
  isLastOnPage: boolean;
  currentPage: number;
  decrementPageBy: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  onPageChangeHandler: (page: number) => void;
}
