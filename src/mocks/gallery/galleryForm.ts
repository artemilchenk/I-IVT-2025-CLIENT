import type { GalleryPutFormControl } from "@/modules/gallery/types.ts";

export const galleryPutFormControls: GalleryPutFormControl[] = [
  {
    id: 1,
    name: "title",
    title: "Title",
    placeholder: "Type gallery title",
    type: "text",
  },
  {
    id: 2,
    name: "description",
    title: "Description",
    placeholder: "Describe gallery",
    type: "text",
  },
];
