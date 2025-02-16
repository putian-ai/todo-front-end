import React from 'react';
import { useMemo } from "react";
import { getTagsByUserGetTagsByUserGet, Todo } from "./client";
import { Tag } from "./client";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import './styles/tag.scss'
import { useAtom } from "jotai";
import { tagPageAtom } from "./atom";

interface ITag {
    id: string;
    className: string;
    [key: string]: string;
}

interface InlineEditProps {
    value: Tag[];
    item: Todo
    onAddition: (tagName: string, todoUserId: number) => Promise<void>;
    onDelete: (index: number) => Promise<void>;
}

const InlineTagEdit: React.FC<InlineEditProps> = ({ value, item, onDelete, onAddition }) => {
    const [, setTagPage] = useAtom(tagPageAtom);
    const fetchTags = async () => {
        try {
            const data = await getTagsByUserGetTagsByUserGet({ page: 1, perPage: 100 });
            setTagPage(data.data!);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        }
    }

    const suggestions = [
        { id: "India", text: "India", className: "red" },
        { id: "Vietnam", text: "Vietnam", className: "" },
        { id: "Turkey", text: "Turkey", className: "" },
    ]
    const tags = useMemo<Array<ITag>>(() =>
        value.map(t => ({
            id: t.name,
            text: t.name,
            className: "black"
        }))
        , [value])

    const handleDrag = (tag: ITag, currPos: number, newPos: number) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    };

    const handleTagClick = (index: number) => {
        console.log("The tag at index " + index + " was clicked");
    };


    const handleDelete = async (index: number) => {
        await onDelete(value[index].id);
        fetchTags()

    }
    const handleAddition = async (tag: ITag) => {
        await onAddition(tag.id, item.user.id)
        fetchTags()
    }


    return (
        <ReactTags
            tags={tags}
            suggestions={suggestions}
            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="inline"
            maxTags={10}
        />
    );


}

export default InlineTagEdit;