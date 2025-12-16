import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/Button.tsx";
import { baseGallerySchema } from "@/modules/gallery/schema.ts";
import type { TBaseGallery } from "@/modules/gallery/types.ts";
import { galleryPutFormControls } from "@/mocks/gallery/galleryForm.ts";
import { DrawerType } from "@/constants/drawer.ts";
import { useParams } from "react-router";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGalleryUpdate } from "../hooks/api/useGalleryUpdate";

export const GalleryUpdateForm = (): React.ReactElement => {
  const { isLoading, mutation } = useGalleryUpdate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const galleryItem = queryClient.getQueryData<TBaseGallery>(["gallery", id]);

  const form = useForm<z.infer<typeof baseGallerySchema>>({
    resolver: zodResolver(baseGallerySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const drawerService = useDrawerService();

  const onSubmit = (dto: TBaseGallery) => {
    if (!id) return;
    mutation.mutate({ dto, id });
  };

  useEffect(() => {
    if (galleryItem) {
      form.reset({
        title: galleryItem.title || "",
        description: galleryItem.description || "",
      });
    }
  }, [galleryItem, form]);

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Update Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {galleryPutFormControls.map((galleryControl) => (
            <FieldGroup key={galleryControl.id}>
              <Controller
                name={galleryControl.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      {galleryControl.title}
                    </FieldLabel>
                    <Input
                      type={galleryControl.type}
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder={galleryControl.placeholder}
                      autoComplete="off"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </FieldGroup>
          ))}
        </form>
      </CardContent>

      <CardFooter className="text-center flex flex-col gap-4">
        <Field orientation="horizontal">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              drawerService.closeDrawer(DrawerType.GALLERY_INFO);
            }}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading} form="form-rhf-demo">
            Update
          </Button>
        </Field>
        <Field orientation="horizontal"></Field>
      </CardFooter>
    </Card>
  );
};
