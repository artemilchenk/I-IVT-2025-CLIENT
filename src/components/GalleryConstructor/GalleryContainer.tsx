import { useState } from "react";
import type { Container, Item } from "@/lib/constructor/types.ts";
import { Draggable, DropContainer, ItemBlock } from "@/lib/constructor";
import { ItemPaginator } from "@/lib/paginator";

export const GalleryContainer = ({
  containerItem,
}: {
  containerItem: Container<Item>;
}) => {
  const [paginationItems, setPaginationItems] = useState<Item[]>([]);

  return (
    <div className={"h-full"}>
      <DropContainer
        id={containerItem.id}
        key={containerItem.id}
        title={containerItem.name}
      >
        <div className={"w-full h-full grid grid-cols-2 gap-3"}>
          {paginationItems.map((item) => (
            <Draggable
              data={{ sourceContainerId: containerItem.id }}
              id={item.id}
              key={item.id}
            >
              <div className={"cursor-pointer"}>
                <ItemBlock label={item.label || ""} />
              </div>
            </Draggable>
          ))}
        </div>
      </DropContainer>

      <div className={"absolute p-2 top-0 right-0"}>
        {containerItem.items?.length ? (
          <ItemPaginator
            data={containerItem.items}
            onPaginatorChange={(items) => {
              setPaginationItems(items);
            }}
            pageSize={4}
          />
        ) : null}
      </div>
    </div>
  );
};
