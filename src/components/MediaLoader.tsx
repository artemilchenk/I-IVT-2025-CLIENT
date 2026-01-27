import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useMediaLoader } from "@/hooks/useMediaLoader.ts";
import { ImagePreview } from "@/components/ImagePreview.tsx";
import { Loader } from "lucide-react";
import loaderIcon from "../../public/download-icon.png";
import audioTypeIcon from "../../public/audio-icon.png";
import videoTypeIcon from "../../public/video-icon.png";
import fileTypeIcon from "../../public/file-icon.png";
import type { MediaLoaderProps, MediaLoaderTypes } from "@/types.ts";

const preview = {
  width: 400,
  height: 300,
};

const style = {
  width: 100,
  height: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function getPreviewImage(type: MediaLoaderTypes, previewUrl: string | null) {
  const imagePreviews: Record<MediaLoaderTypes, string | null> = {
    image: previewUrl,
    audio: audioTypeIcon,
    video: videoTypeIcon,
  };

  return imagePreviews[type] || fileTypeIcon;
}

export const MediaLoader = ({
  type,
  onLoaded,
  onIsLoading,
  onError,
  renderLoading,
  renderSuccess,
  renderIdle,
  onClose,
}: MediaLoaderProps) => {
  const { isLoading, loadFile, data, error } = useMediaLoader();
  const imagePreview = useMemo(() => {
    return getPreviewImage(type, data?.previewUrl || null);
  }, [type, data?.previewUrl]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      loadFile(file);
    },
    [loadFile],
  );

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  //onLoaded
  useEffect(() => {
    if (data) onLoaded(data.loadedFile);
  }, [data, onLoaded]);

  //isLoading
  useEffect(() => {
    if (onIsLoading) onIsLoading(isLoading);
  }, [isLoading, onIsLoading]);

  //onError
  useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  useEffect(() => {
    return () => {
      if (onClose) onClose();
    };
  }, []);

  return (
    <div className={"flex justify-center w-full h-full "}>
      <input
        type="file"
        accept={`${type}/*`}
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />

      {/* STATE MACHINE */}
      {!data && !isLoading && (
        <span onClick={openFileDialog}>
          {renderIdle ? (
            renderIdle()
          ) : (
            <ImagePreview src={loaderIcon} width={100} height={100} />
          )}
        </span>
      )}

      {isLoading &&
        (renderLoading ? renderLoading() : <Loader style={style} />)}

      {data &&
        !isLoading &&
        (renderSuccess ? (
          renderSuccess({ data, type })
        ) : (
          <ImagePreview
            src={imagePreview}
            width={type === "image" ? preview.width : 100}
            height={type === "image" ? preview.height : 100}
          />
        ))}
    </div>
  );
};
