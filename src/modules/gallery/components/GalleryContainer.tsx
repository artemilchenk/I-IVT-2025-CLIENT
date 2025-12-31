import { type FC, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/router.ts";
import { DrawerIndexes, DrawerType } from "@/constants/drawer.ts";
import { useDrawerService } from "@/features/drawer/useDrawer.ts";
import type { Container } from "@/lib/dnd";
import { Button } from "@/components/ui/Button.tsx";
import { DrawerComponent } from "@/features/drawer/ui/DrowerComponent.tsx";
import { ConfirmPrompt } from "@/components/ConfirmPrompt.tsx";
import { useGalleryDelete } from "@/modules/gallery/hooks/api/useGalleryDelete.ts";
import { useGalleries } from "@/modules/gallery/context.ts";

interface Props {
  container: Container;
  children: ReactNode;
}

export const GalleryContainer: FC<Props> = ({ container, children }) => {
  const navigate = useNavigate();
  const drawerService = useDrawerService();
  const { isLastOnPage, decrementPageBy } = useGalleries();
  const { isLoading, mutation } = useGalleryDelete({
    onDeleteSuccess: () => {
      if (isLastOnPage) decrementPageBy(1);
    },
  });

  return (
    <div
      onClick={() => navigate(ROUTES.GALLERY_ID(container.id).path)}
      key={container.id}
      className="relative overflow-hidden dnd-container max-h-80 flex flex-col gap-2 p-2 h-full"
    >
      <DrawerComponent
        index={DrawerIndexes.GALLERY_DELETE}
        isOpen={drawerService.checkDrawer(
          DrawerType.GALLERY_DELETE,
          container.id,
        )}
      >
        <ConfirmPrompt
          text={"Delete this gallery?"}
          onConfirm={() => mutation.mutate(container.id)}
          onCancel={() => {
            drawerService.closeDrawer(DrawerType.GALLERY_DELETE, container.id);
          }}
        />
      </DrawerComponent>

      <h3 className="text-lg font-semibold h-fit">{container.title}</h3>

      <div className={"flex-1 overflow-scroll"}>
        <div className="p-5 grid grid-cols-2 gap-3 h-full">{children}</div>
      </div>

      <span>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            drawerService.openDrawer(DrawerType.GALLERY_DELETE, container.id);
          }}
          disabled={isLoading}
        >
          Delete
        </Button>
      </span>
    </div>
  );
};
