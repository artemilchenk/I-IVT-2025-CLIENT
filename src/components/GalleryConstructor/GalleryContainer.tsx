import { useState } from "react";
import type { CreatePhotoResponse } from "@/modules/gallery/types.ts";
import type { Container } from "@/lib/constructor/types.ts";
import { Draggable, DropContainer, ItemBlock } from "@/lib/constructor";
import { ItemPaginator } from "@/lib/paginator";

export const GalleryContainer = ({
  container,
}: {
  container: Container<CreatePhotoResponse>;
}) => {
  const [paginationItems, setPaginationItems] = useState<CreatePhotoResponse[]>(
    [],
  );

  return (
    <div>
      <DropContainer
        id={container.id}
        key={container.id}
        title={container.name}
      >
        {paginationItems.map((item) => (
          <Draggable
            data={{ sourceContainerId: container.id }}
            id={item.id}
            key={item.id}
          >
            <div className={"cursor-pointer"}>
              <ItemBlock label={item.originalFilename} />
            </div>
          </Draggable>
        ))}
      </DropContainer>
      {container.items?.length && (
        <ItemPaginator
          data={container.items}
          onPaginatorChange={(items) => {
            setPaginationItems(items);
          }}
          pageSize={4}
        />
      )}
    </div>
  );
};
