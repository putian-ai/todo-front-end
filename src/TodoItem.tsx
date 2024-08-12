import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from './client';
import dayjs from 'dayjs';

interface TodoItemProps {
  item: Todo;
  onDelete?: () => void;
  onCheck?: () => void;
  onUpdate: (updatedText: string) => void; // Callback to update the todo text
  onClick: (item: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onDelete,
  onCheck,
  onUpdate,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.item);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSpanClick = () => {
    setIsEditing(true);
    onClick(item);
    console.log("click item: " + item.item)

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onUpdate(editText); // Update the todo text when input loses focus
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur(); // Trigger blur to update and exit edit mode
    }
  };

  // Use useEffect to focus the input when isEditing becomes true
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
      <div className="flex items-center flex-1 gap-2">
        <Checkbox
          onCheckedChange={onCheck}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="text-gray-800 focus:outline-none w-full"
            value={editText}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <span
            className="text-gray-800 cursor-text w-full text-left"
            onClick={handleSpanClick}
          >
            {item.item}
          </span>
        )}
      </div>
      <div className="text-gray-500 text-[12px]">
        {dayjs(item.plan_time).format('YYYY-MM-DD HH:mm')}
        {onDelete && (
          <button
            onClick={onDelete}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;