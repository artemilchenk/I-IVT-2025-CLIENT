import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/modules/auth/context.ts";
import type { SignUpData } from "@/modules/auth/types.ts";
import { signUpSchema } from "@/modules/auth/schema.ts";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const queryClient = useQueryClient();

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/galleries", { replace: true });
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);
      setServerError(error.response.data.message);
    },
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpData, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    const signUpData = {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    };

    const result = signUpSchema.safeParse(signUpData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignUpData, string>> = {};

      result.error?.issues.forEach((err) => {
        const field = err.path[0] as keyof SignUpData;
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
        type="text"
        placeholder="First name"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errors.firstname && (
        <p className="text-red-500 text-sm">{errors.firstname}</p>
      )}
      <input
        type="text"
        placeholder="Last name"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errors.lastname && (
        <p className="text-red-500 text-sm">{errors.lastname}</p>
      )}
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
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {errors.confirmpassword && (
        <p className="text-red-500 text-sm">{errors.confirmpassword}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Loading..." : "Sign Up"}
      </button>
      Or
      <button
        onClick={() => navigate("/auth/sign-in", { replace: true })}
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isPending}
      >
        Sign In
      </button>
      {mutation.isError && (
        <div className="text-red-500 mt-2">{serverError}</div>
      )}
    </form>
  );
};
