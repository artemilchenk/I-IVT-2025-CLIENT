import type { ReactNode } from "react";

export type MediaLoaderTypes = "image" | "audio" | "video";

export interface LoadData {
  loadedFile: File;
  previewUrl: string;
}

export interface MediaLoaderState {
  data: LoadData | null;
  error: string | null;
  isLoading: boolean;
  loadFile: (file: File) => void;
  reset: () => void;
}

export type ImagePreviewProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export type IdleProps = {
  openFileDialog: () => void;
};

export type SuccessProps = {
  data: LoadData;
  type: MediaLoaderTypes;
};

export type MediaLoaderProps = {
  type: MediaLoaderTypes;
  onLoaded: (data: LoadData) => void;
  onIsLoading?: (value: boolean) => void;
  onError?: (value: string) => void;

  renderIdle?: () => ReactNode;
  renderLoading?: () => ReactNode;
  renderSuccess?: (props: SuccessProps) => ReactNode;
};
