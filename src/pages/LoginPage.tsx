import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/modules/auth/context.ts";
import type { SignInData } from "@/modules/auth/types.ts";
import { signInSchema } from "@/modules/auth/schema.ts";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const queryClient = useQueryClient();

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile", { replace: true });
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);

      setServerError(error.response.data.message);
    },
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    const signInData = { email, password };

    const result = signInSchema.safeParse(signInData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignInData, string>> = {};

      result.error?.issues.forEach((err) => {
        const field = err.path[0] as keyof SignInData;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    mutation.mutate(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Loading..." : "Sign In"}
      </button>
      Or
      <button
        onClick={() => navigate("/auth/sign-up", { replace: true })}
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isPending}
      >
        Sign Up
      </button>
      {mutation.isError && (
        <div className="text-red-500 mt-2">{serverError}</div>
      )}
    </form>
  );
};
