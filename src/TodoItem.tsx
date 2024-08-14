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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateTimePickerForm } from './components/ui/date-time-picker-form.tsx';

interface TodoItemProps {
  item: Todo;
  isSelected: boolean;
  onDelete: (item: Todo) => void;
  onCheck?: () => void;
  onUpdate: (updatedText: string) => void; // Callback to update the todo text
  onTimeUpdate: (updatedTime: Date) => void; // Callback to update the todo time
  onClick: (item: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  isSelected,
  onDelete,
  onCheck,
  onUpdate,
  onTimeUpdate,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.item);
  const [selectedDate, setSelectedDate] = useState(dayjs(item.plan_time).toDate());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSpanClick = () => {
    setIsEditing(true);
    onClick(item);
    console.log("click item: " + item.item)

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
    onUpdate(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    // onUpdate(editText); // Update the todo text when input loses focus
  };

  const handleClickDelete = () => {
    onDelete(item);
  };


  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur(); // Trigger blur to update and exit edit mode
    }
  };

  const handleDateTimeChange = (date: Date) => {
    console.log(date)
    setSelectedDate(date);
    onTimeUpdate(date); // Update the todo item's time
  };


  // Use useEffect to focus the input when isEditing becomes true
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={`flex items-center m-2 rounded-lg justify-between py-2 px-4 border-b border-gray-200 ${isSelected ? 'bg-[#D1E9F6]' : 'hover:bg-gray-200'}`}>
      <div className="flex items-center flex-1 gap-2">
        <Checkbox
          onCheckedChange={onCheck}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="text-gray-800 focus:outline-none w-full bg-[#D1E9F6]"
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
            {editText}
          </span>
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="text-gray-500 text-[12px] cursor-pointer"
          >
            {dayjs(selectedDate).format('YYYY-MM-DD HH:mm')}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <DateTimePickerForm onSubmit={handleDateTimeChange} />
        </PopoverContent>
      </Popover>
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