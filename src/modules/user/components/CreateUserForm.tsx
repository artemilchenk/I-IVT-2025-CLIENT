"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useNavigate } from "react-router";

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
import { signUpSchema } from "@/modules/auth/schema.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/context.ts";
import type { SignUpData } from "@/modules/auth/types.ts";
import { userCreateFormControls } from "@/mocks/user/userForm.ts";
import { handleError } from "@/sheared";
import { ROUTES } from "@/constants/router.ts";

export const CreateUserForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = (formData: SignUpData) => {
    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Authorised!");
      navigate(ROUTES.PROFILE.path, { replace: true });
    },
    onError: (error) => {
      handleError(error, "Create user error");
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {userCreateFormControls.map((user) => (
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
          ))}
        </form>
      </CardContent>

      <CardFooter className="text-center flex flex-col gap-4">
        <Field orientation="horizontal">
          <Button type="button" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Sign Up
          </Button>
        </Field>
        <Field orientation="horizontal">
          <Button
            disabled={mutation.isPending}
            onClick={() => navigate("/auth/sign-in", { replace: true })}
            className={"w-full"}
          >
            Sign In
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
