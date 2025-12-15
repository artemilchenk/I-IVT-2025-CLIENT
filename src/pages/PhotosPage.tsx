import { useFetchPhotos } from "@/modules/gallery/hooks/api/usePhotos.ts";
import { useParams } from "react-router";
import { GalleryConstructor } from "@/components/GalleryConstructor/GalleryConstructor.tsx";
import { useFetchGalleries } from "@/modules/gallery/hooks/api/useGalleries.ts";

export const PhotosPage = () => {
  const { galleryId } = useParams();
  const { photos } = useFetchPhotos(galleryId || "");
  const { isLoading } = useFetchGalleries();

  if (!photos?.length) return;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={"w-full "}>
      <GalleryConstructor />
    </div>
  );
};
