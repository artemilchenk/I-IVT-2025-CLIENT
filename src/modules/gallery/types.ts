import { z } from "zod";
import { type baseGallerySchema } from "@/modules/gallery/schema.ts";

import type { HTMLInputTypeAttribute } from "react";

export interface FormControl<T> {
  id: number;
  name: T;
  title: string;
  placeholder: string;
  type: HTMLInputTypeAttribute | undefined;
}

export type TBaseGallery = z.infer<typeof baseGallerySchema>;

export interface IGalleryCreateResponse extends TBaseGallery {
  id: string;
  createdAt: Date;
  user?: { id: number };
  images?: UploadPhotoResponse[];
}

export interface PhotoMoveDto {
  id: string;
  targetContainerId: string;
  optimisticData: IGalleryCreateResponse[];
}

export interface IGalleriesCreateResponse extends TBaseGallery {
  id: string;
  createdAt: Date;
  user?: { id: number };
  images?: UploadPhotoResponse[];
}

export interface IGalleriesResponse {
  data: IGalleriesCreateResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export type GalleryPutFormControlNames = keyof TBaseGallery;
export type GalleryPutFormControl = FormControl<GalleryPutFormControlNames>;

export interface UploadPhotoResponse {
  id: string;
  path: string;
  galleryId: string;
  originalFilename: string;
  createdAt: Date;
}

export interface GalleryContextType {
  galleries: IGalleryCreateResponse[];
  galleriesIsFetching: boolean;
  isDrover: boolean;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastOnPage: boolean;
  isFullPage: boolean;
  currentPage: number;
  decrementPageBy: (step: number) => void;
  incrementPageBy: (step: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  onPageChangeHandler: (page: number) => void;
}
