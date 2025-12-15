export const ItemBlock = ({
  label,
  dragging,
}: {
  label: string;
  dragging?: boolean;
}) => {
  return (
    <div
      className={`p-3 rounded shadow bg-white ${dragging ? "opacity-80" : ""}`}
    >
      {label}
    </div>
  );
};
