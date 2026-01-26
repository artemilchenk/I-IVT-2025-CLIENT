import type { ImagePreviewProps } from "@/types";
import React from "react";

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt = "Preview",
  width = 300,
  height = 300,
}) => {
  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
};
