"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { userUpdateFormControls } from "@/mocks/user/userForm.ts";
import type {
  UpdateUserDataBase,
  UpdateUserDataFull,
} from "@/modules/user/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/context.ts";
import {
  UpdateUserSchemaBase,
  UpdateUserSchemaFull,
} from "@/modules/user/schema.ts";
import { useDrawer } from "@/features/drawer/store";
import { useCallback, useEffect, useMemo } from "react";
import { DrawerService } from "@/features/drawer/service";
import { DrawerType } from "@/constants/drawer.ts";
import { useUserForm } from "@/modules/user/form/useUserForm.ts";
import { updateUserForModes } from "@/modules/user/constants.ts";
import { getSchemaForMode } from "@/modules/user/utils.ts";
import { handleError } from "@/sheared";

export const UpdateUserForm = (): React.ReactElement => {
  const { updateUser } = useAuth();
  const { userFormService, mode } = useUserForm();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isChecked = useMemo(() => mode === updateUserForModes.FULL, [mode]);

  const onPasswordCheck = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        userFormService.switchFullMode();
      } else {
        userFormService.switchBaseMode();
      }
    },
    [userFormService],
  );

  const drawerStore = useDrawer();

  const drawerService = useMemo(
    () => new DrawerService(drawerStore),
    [drawerStore],
  );

  const form = useForm<
    z.infer<typeof UpdateUserSchemaBase | typeof UpdateUserSchemaFull>
  >({
    resolver: zodResolver(getSchemaForMode(mode)),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      oldpassword: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = (formData: UpdateUserDataBase | UpdateUserDataFull) => {
    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      toast.success("Successfully updated user");
      drawerService.closeDrawer(DrawerType.EDIT_PROFILE);
    },
    onError: (error) => {
      handleError(error, "Update user error");
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        oldpassword: "",
        password: "",
        confirmpassword: "",
      });
    }
  }, [user, form]);

  return (
    <Card className="sm:max-w-md h-fit">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {userUpdateFormControls.map((user) => {
            if (mode === updateUserForModes.BASE && user.type === "password")
              return null;
            return (
              <FieldGroup key={user.id}>
                <Controller
                  name={user.name}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        {user.title}
                      </FieldLabel>
                      <Input
                        type={user.type}
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder={user.placeholder}
                        autoComplete="off"
                      />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : null}
                    </Field>
                  )}
                />
              </FieldGroup>
            );
          })}
        </form>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onPasswordCheck}
            className="h-4 w-4 accent-blue-600 cursor-pointer"
          />
          <span className="text-sm text-gray-700">Change password</span>
        </label>
      </CardContent>

      <CardFooter className="text-center flex flex-col gap-4">
        <Field orientation="horizontal">
          <Button
            size={"sm"}
            type="button"
            onClick={() => {
              form.reset();
              drawerService.closeDrawer(DrawerType.EDIT_PROFILE);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            type="submit"
            form="form-rhf-demo"
          >
            Update
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
