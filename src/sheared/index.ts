import { isAxiosError } from "axios";
import { toast } from "sonner";

export type ValueOf<T extends Record<string, any>> = T[keyof T];

export const handleError = (error: Error, text: string) => {
  if (isAxiosError(error) && error.response) {
    toast.error(error.response.data.message); // safe now
    console.error(text, error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
    console.error(text, error.message);
  } else {
    toast.error("Unknown error");
    console.error("Unknown error", error);
  }
};
