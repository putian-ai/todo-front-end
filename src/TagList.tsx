import { useEffect, useState } from "react";
import { getTagsByUserGetTagsByUserGet, PaginateModel_Tag_, Tag } from "./client";
import TagItem from "./TagItem";
import { useAtom } from "jotai";
import { tagPageAtom } from "./atom";

function TagList() {

  const [tagList, setTagList] = useState<PaginateModel_Tag_>()
  const [loading, setLoading] = useState<boolean>(false)
  const [Tags, setTags] = useAtom(tagPageAtom)
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(100)

  const fetchTags = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const data = await getTagsByUserGetTagsByUserGet({ page, perPage });
      setTagList(data);
      setTags(data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTags(page, perPage);
  }, [page, perPage])


  console.log(Tags)

  if (Tags) {
    return (
      <div>
        <h1>Tags</h1>
        {Tags?.items.map((tag) => (
          <TagItem key={tag.id} item={tag} isSelected={false} onDelete={function (item: Tag): void {
            throw new Error("Function not implemented.");
          }} onUpdate={function (updatedText: string): void {
            throw new Error("Function not implemented.");
          }} onClick={function (item: Tag): void {
            throw new Error("Function not implemented.");
          }} />
        ))}
      </div>
    );
  }
}

export default TagList;