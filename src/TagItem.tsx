import React from 'react';
import { Tag } from './client';
import { Button } from './components/ui/button';
import { Tag as TagIcon } from 'lucide-react';

interface TagItemProps {
  item: Tag;
  onDelete: (item: Tag) => void;
  onUpdate: (updatedText: string) => void;
  onClick: (item: Tag) => void;
}

const TagItem: React.FC<TagItemProps> = ({
  item,
  onDelete,
  onClick,
}) => {
  const handleSpanClick = () => {
    onClick(item);
  };

  return (
    <div
      className={`flex items-center m-2 rounded-lg justify-between py-2 px-4 border-b border-gray-200 ${item.isSelected ? 'bg-gray-400' : 'hover:bg-gray-200'
        }`}
      onClick={handleSpanClick}
    >
      <div className="flex items-center">
        <span>
          <TagIcon className="h-4 w-4 mr-2" />
          {item.name}
        </span>
      </div>
      <Button onClick={() => onDelete(item)}>Delete</Button>
    </div>
  );
};

export default TagItem;