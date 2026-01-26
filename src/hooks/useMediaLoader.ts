import type { LoadData, MediaLoaderState } from "@/types";
import { useEffect, useState } from "react";

export function useMediaLoader(): MediaLoaderState {
  const [data, setData] = useState<LoadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setData(null);
  };
  const revokePreview = () => {
    reset();
  };

  const loadFile = async (file: File) => {
    revokePreview();

    setIsLoading(true);

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      const url = URL.createObjectURL(file);

      setData({
        loadedFile: file,
        previewUrl: url,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
        revokePreview();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      revokePreview();
    };
  }, []);

  return {
    data,
    isLoading,
    loadFile,
    error,
    reset,
  };
}
