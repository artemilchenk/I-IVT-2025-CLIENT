import { httpClient } from "@/services/httpClient.ts";
import type { UploadPhotoResponse } from "@/modules/gallery/types.ts";

export const GalleryPhotoItem = ({
  item,
  isDragOverlay,
}: {
  item: UploadPhotoResponse;
  isDragOverlay?: boolean;
}) => {
  return (
    <div
      style={{
        width: "auto",
        height: "200px",
        overflow: "hidden",
      }}
      className={`dnd-item p-2 bg-green-200 min-h-30 ${isDragOverlay && "shadow-lg"}`}
    >
      {item.originalFilename}
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={`${httpClient.baseUrl}${item.path}`}
        alt=""
      />
    </div>
  );
};
