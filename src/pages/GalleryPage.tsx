import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/Button.tsx";
import { useFetchGallery } from "@/modules/gallery/hooks/useFetchGallery.ts";
import ImagePlaceholder from "@/components/ImagePlaceholder.tsx";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { DrawerType } from "@/constants/drawer.ts";
import { GalleryUpdateForm } from "@/modules/gallery/components/GaleryUpdateForm.tsx";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";

export function GalleryPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const drawerService = useDrawerService();

  const { isLoading, gallery } = useFetchGallery(id || "");

  if (isLoading) return <Loader />;

  return (
    <div className="relative p-8 w-full max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 text-white" />
      </Button>

      <Card className="relative flex overflow-hidden shadow-md rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <ImagePlaceholder />

            <div className="absolute right-2 top-2 flex gap-2">
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
            isOpen={!!drawerService.checkDrawer(DrawerType.GALLERY_INFO)}
            onClose={() => drawerService.closeDrawer(DrawerType.GALLERY_INFO)}
          >
            <div className="flex w-full h-full justify-center items-center">
              <GalleryUpdateForm />
            </div>
          </DrawerComponent>

          {/* Title */}
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
