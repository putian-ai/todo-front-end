import React, { useEffect, useState } from "react";
import { getTagsByUserGetTagsByUserGet, Tag } from "./client";
import TagItem from "./TagItem";
import { useAtom } from "jotai";
import { tagPageAtom, selectedTagIDAtom } from "./atom";

function TagList() {

  const [, setLoading] = useState<boolean>(false)
  const [tagPage, setTagPage] = useAtom(tagPageAtom)
  const [, setSelectedTagID] = useAtom(selectedTagIDAtom)
  const [page,] = useState<number>(1)
  const [perPage,] = useState<number>(100)

  const fetchTags = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const data = await getTagsByUserGetTagsByUserGet({ page, perPage });
      setTagPage(data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTags(page, perPage);
  }, [page, perPage])


  const onClick = (clickedItem: Tag) => {
    if (tagPage) {
      if (clickedItem.isSelected) {
        setSelectedTagID(-1);
      } else {
        setSelectedTagID(clickedItem.id);
      }
      const updatedItems = tagPage.items.map((item) =>
        item.id === clickedItem.id
          ? { ...item, isSelected: !item.isSelected }
          : { ...item, isSelected: false }
      );
      setTagPage({ ...tagPage, items: updatedItems });
    }
  }

  if (tagPage) {
    return (
      <div>
        <h1>Tags</h1>
        {tagPage?.items.map((tag) => (
          <TagItem
            key={tag.id}
            item={tag}
            onDelete={function (): void { }}
            onUpdate={function (): void { }}
            onClick={onClick}
          />
        ))}
      </div>
    );
  }
}

export default TagList;