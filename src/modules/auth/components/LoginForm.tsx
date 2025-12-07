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
import { signInSchema } from "@/modules/auth/schema.ts";
import { loginFormControls } from "@/mocks/user/userForm.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/context.ts";
import type { SignInData } from "@/modules/auth/types.ts";
import { ROUTES } from "@/constants/router.ts";
import { handleError } from "@/sheared";

export const LoginForm = (): React.ReactElement => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData: SignInData) => {
    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate(ROUTES.PROFILE.path, { replace: true });
      toast.success("Signed In!");
    },
    onError: (error) => {
      handleError(error, "Sign In error");
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {loginFormControls.map((user) => (
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
          <Button type="button" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            disabled={mutation.isPending}
            form="form-rhf-demo"
          >
            Sign In
          </Button>
        </Field>
        <Field orientation="horizontal">
          <Button
            onClick={() => navigate("/auth/sign-up", { replace: true })}
            className={"w-full"}
          >
            Sign Up
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
