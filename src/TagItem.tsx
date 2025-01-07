import React, { useState, useRef, useEffect } from 'react';
import { Tag, Todo } from './client';
import { Button } from './components/ui/button';
import { Tag as TagIcon } from "lucide-react";

interface TagItemProps {
  item: Tag;
  isSelected: boolean;
  onDelete: (item: Tag) => void;
  onUpdate: (updatedText: string) => void; // Callback to update the todo text
  onClick: (item: Tag) => void;
}

const TagItem: React.FC<TagItemProps> = ({
  item,
  isSelected,
  onDelete,
  onUpdate,
  onClick,
}) => {
  const handleSpanClick = () => {
    onClick(item);
    console.log("click Tag: " + item.name)

  };

  return (
    <div className={`flex items-center m-2 rounded-lg justify-between py-2 px-4 border-b border-gray-200 ${isSelected ? 'bg-[#D1E9F6]' : 'hover:bg-gray-200'}`}>
      <div className="flex items-center">
        <span
          onClick={handleSpanClick}
        >
          <TagIcon className="h-4 w-4 mr-2" />
          {item.name}
        </span>
      </div>
      <Button onClick={() => onDelete(item)}>Delete</Button>

    </div>

  );
}

export default TagItem;