import { useState } from "react";

interface InlineEditProps {
    value: string;
    onChange: (newValue: string) => void;
  }
  
  const InlineEdit: React.FC<InlineEditProps> = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
  
    const handleBlur = () => {
      setIsEditing(false);
      onChange(currentValue); // Update on blur as well
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(event.target.value);
    };
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    return (
      <span
        onClick={handleClick}
      >
        {isEditing ? (
          <input
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
  
  export default InlineEdit;