import { isAxiosError } from "axios";
import { toast } from "sonner";

export type ValueOf<T extends Record<string, any>> = T[keyof T];

export const handleError = (error: Error, text: string) => {
  if (isAxiosError(error) && error.response) {
    console.error(error.response.data.message, error.message);
  } else {
    console.error(error.message);
  }

  toast.error(text);
};
