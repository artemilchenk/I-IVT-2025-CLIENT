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
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import type { FC } from "react";
import { cn } from "@/lib/utils.ts";
import { useGalleryCreate } from "@/modules/gallery/hooks/api/useGalleryCreate.ts";

interface Props {
  className?: string;
}

export const GalleryCreateForm: FC<Props> = ({
  className,
}): React.ReactElement => {
  const { isLoading, mutation } = useGalleryCreate();

  const form = useForm<z.infer<typeof baseGallerySchema>>({
    resolver: zodResolver(baseGallerySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const drawerService = useDrawerService();

  const onSubmit = (formData: TBaseGallery) => {
    mutation.mutate(formData);
    form.reset();
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Create Gallery</CardTitle>
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
              drawerService.closeDrawer(DrawerType.CREATE_GALLERY);
            }}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading} form="form-rhf-demo">
            Create
          </Button>
        </Field>
        <Field orientation="horizontal"></Field>
      </CardFooter>
    </Card>
  );
};
