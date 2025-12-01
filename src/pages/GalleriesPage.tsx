export const GalleriesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Galleries</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 h-40 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};
