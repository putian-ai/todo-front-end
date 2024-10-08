import { useEffect, useRef, useState } from "react";
import { Todo } from "./client";

interface InlineEditProps {
  value: string;
  item: Todo

  onChange: (newValue: string) => void;
  onClick: (item: Todo) => void;
}

const InlineTextEdit: React.FC<InlineEditProps> = ({ value, item, onChange, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange(event.target.value)
  };

  const handleClick = () => {
    setIsEditing(true);
    onClick(item);
  };

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [isEditing])


  return (
    <span
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="inline-edit__input"
        />
      ) : (
        <span className="inline-edit__text">{value}</span>
      )}
    </span>
  );
};

export default InlineTextEdit;