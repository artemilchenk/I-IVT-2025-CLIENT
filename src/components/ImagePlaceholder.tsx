const ImagePlaceholder = ({
  src = "",
  alt = "",
  width = 200,
  height = 200,
  className = "",
}) => {
  const hasImage = Boolean(src);

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    objectFit: "cover",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: "14px",
  };

  return (
    <div style={style} className={className}>
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>No Image</span>
      )}
    </div>
  );
};

export default ImagePlaceholder;
