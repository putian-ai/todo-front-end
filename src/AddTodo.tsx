import React, { useState, useRef, useEffect } from 'react';
import { Todo } from './client';
import dayjs from 'dayjs';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateTimePickerForm } from './components/ui/date-time-picker-form.tsx';

interface TodoItemProps {
  item: Todo;
  isSelected: boolean;
  timeVisible: boolean;
  onDelete: (item: Todo) => void;
  onCheck?: () => void;
  onUpdate: (updatedText: string) => void; // Callback to update the todo text
  onTimeUpdate: (updatedTime: Date) => void; // Callback to update the todo time
  onClick: (item: Todo) => void;
}

const AddTodo: React.FC<TodoItemProps> = ({
  item,
  isSelected,
  timeVisible,
  onDelete,
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
    setOpen(false);
  };


  // Use useEffect to focus the input when isEditing becomes true
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const [open, setOpen] = useState(false)

  return (
    <div className={`flex items-center m-2 rounded-lg justify-between py-2 px-4 border-b border-gray-200 ${isSelected ? 'bg-[#D1E9F6]' : 'hover:bg-gray-200'}`}>
      <div className="flex items-center flex-1 gap-2">
        {isEditing ? (
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            <span className='icon-add-kanban-task text-grey-20 w-[24px] h-[24px] inline-block flex-none'>
              Add Todo
            </span>
          </div>

        ) : (
          <div>
            <input
              ref={inputRef}
              type="text"
              className="text-gray-800 focus:outline-none w-full bg-[#D1E9F6] cursor-pointer"
              value={editText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleEditKeyDown}
            />

            <Popover open={open} onOpenChange={(o) => { setOpen(o) }}>
              <PopoverTrigger asChild>
                <div
                  className="text-gray-500 text-[12px] cursor-pointer"
                >
                  {dayjs(selectedDate).format('YYYY-MM-DD HH:mm')}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <DateTimePickerForm onSubmit={handleDateTimeChange} initialDateTime={dayjs(item.plan_time).toDate()} />
              </PopoverContent>
            </Popover>
          </div>

        )}
      </div>


    </div >
  );
};

export default AddTodo;