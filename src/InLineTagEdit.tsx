import { useMemo, useState } from "react";
import { Todo } from "./client";
import { Tag } from "./client";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import './styles/tag.scss'

interface ITag {
    id: string;
    className: string;
    [key: string]: string;
}

interface InlineEditProps {
    value: Tag[];
    item: Todo
    onAddition: (tagName: string, todoUserId: number) => void;
    onDelete: (index: number) => void;
}

const InlineTagEdit: React.FC<InlineEditProps> = ({ value, item, onDelete, onAddition }) => {

    const suggestions = [
        { id: "India", text: "India", className: "red" },
        { id: "Vietnam", text: "Vietnam", className: "" },
        { id: "Turkey", text: "Turkey", className: "" },
    ]
    const tags = useMemo<Array<ITag>>(() =>
        value.map(t => ({
            id: t.name,
            text: t.name,
            className: t.color
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


    const handleDelete = (index: number) => {
        onDelete(value[index].id);
    }
    const handleAddition = (tag: ITag) => {
        onAddition(tag.id, item.user.id)
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
            maxTags={7}
        />
    );


}

export default InlineTagEdit;