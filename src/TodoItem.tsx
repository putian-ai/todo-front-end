import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from './client';
import dayjs from 'dayjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';
import { Button } from './components/ui/button';

interface TodoItemProps {
  item: Todo;
  onDelete: (item: Todo) => void;
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

  const handleClickDelete = () => {
    onDelete(item);
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
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleClickDelete()}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TodoItem;