import type { FC } from "react";
import { BaseButton } from "@/components/ui/Button.tsx";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <BaseButton onClick={() => navigate(ROUTES.HOME.path)}>
        Go Home
      </BaseButton>
    </div>
  );
};
