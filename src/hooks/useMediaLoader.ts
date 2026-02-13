import type { LoadData, MediaLoaderState } from "@/types";
import { useEffect, useState } from "react";

export function useMediaLoader(): MediaLoaderState {
  const [data, setData] = useState<LoadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const revokePreview = () => {
    if (data?.previewUrl) {
      URL.revokeObjectURL(data.previewUrl);
    }
  };

  const reset = () => {
    revokePreview();
    setData(null);
  };

  const loadFile = async (file: File) => {
    reset();

    setIsLoading(true);

    try {
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
        reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      reset();
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
