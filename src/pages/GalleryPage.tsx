import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/Button.tsx";
import ImagePlaceholder from "@/components/ImagePlaceholder.tsx";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { GalleryUpdateForm } from "@/modules/gallery/components/GaleryUpdateForm.tsx";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import { useFetchGallery } from "@/modules/gallery/hooks/api/useFetchGallery.ts";
import { usePhotoUpload } from "@/modules/gallery/hooks/api/usePhotoCreate.ts";
import { ROUTES } from "@/constants/router.ts";
import { useModalService } from "@/features/modal/hooks/useModalService.ts";
import { MediaLoader } from "@/components/MediaLoader.tsx";
import Modal from "react-modal";
import { toast } from "sonner";
import { useState } from "react";
import type { LoadData } from "@/types.ts";

export function GalleryPage() {
  const modalService = useModalService();
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileData, setFileData] = useState<LoadData | null>(null);

  const drawerService = useDrawerService();
  const { isLoading: isCrtPhotoLoading, mutation } = usePhotoUpload();

  const { isLoading, gallery } = useFetchGallery(id || "");

  if (!id) return;

  if (isLoading) return <Loader />;

  return (
    <div className="relative p-8 w-full max-w-3xl mx-auto space-y-6">
      <Modal
        isOpen={modalService.readOnlyState.isModal}
        onRequestClose={() => modalService.close()}
        style={{
          content: {
            width: "800px",
            height: "500px",
            margin: "auto",
            padding: "20px",
          },
        }}
      >
        <div className={"h-full w-full relative"}>
          <Button
            className={"absolute top-0 right-0 z-50"}
            onClick={() => {
              modalService.close();
            }}
          >
            Close
          </Button>

          <div
            className={"loader flex flex-col items-center gap-3 justify-center"}
          >
            {fileData && (
              <h2>
                <span>{fileData.loadedFile.name}</span>
              </h2>
            )}

            <MediaLoader
              type={"image"}
              onLoaded={(data) => {
                setFileData(data);
              }}
              onError={(error) => {
                toast.error(error);
              }}
            />

            <Button
              onClick={() => {
                if (!fileData || !id) return;

                mutation.mutate({
                  file: fileData.loadedFile,
                  galleryId: id,
                });
              }}
            >
              Upload Photo
            </Button>
          </div>
        </div>
      </Modal>

      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Card className="relative flex overflow-hidden shadow-md rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <ImagePlaceholder />

            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                onClick={() => {
                  modalService.open();
                }}
              >
                Add Photo
              </Button>

              <Button
                disabled={isCrtPhotoLoading}
                onClick={() => {
                  navigate(ROUTES.PHOTOS_ID(id).path);
                }}
              >
                View Photos
              </Button>

              {!drawerService.checkDrawer(DrawerType.GALLERY_INFO) && (
                <Button
                  onClick={() => {
                    drawerService.openDrawer(DrawerType.GALLERY_INFO);
                  }}
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <DrawerComponent
            isOpen={drawerService.checkDrawer(DrawerType.GALLERY_INFO)}
            onClose={() => drawerService.closeDrawer(DrawerType.GALLERY_INFO)}
          >
            <div className="flex w-full h-full justify-center items-center">
              <GalleryUpdateForm />
            </div>
          </DrawerComponent>

          <section>
            <h2 className="text-lg font-medium">Title</h2>
            <p className="text-muted-foreground">{gallery?.title}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-medium">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {gallery?.description}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
