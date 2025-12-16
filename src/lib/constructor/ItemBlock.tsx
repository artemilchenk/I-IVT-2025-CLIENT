export const ItemBlock = ({
  label,
  dragging,
}: {
  label: string;
  dragging?: boolean;
}) => {
  return (
    <div
      className={`p-2 rounded shadow bg-white ${dragging ? "opacity-80" : ""} h-30`}
    >
      {label}
    </div>
  );
};
