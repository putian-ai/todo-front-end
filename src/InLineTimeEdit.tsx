import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

interface InlineEditProps {
    value: string;

    onChange: (newValue: string) => void;
}

const InlineTimeEdit: React.FC<InlineEditProps> = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(dayjs(event.target.value).format('YYYY-MM-DD HH:mm'));
        onChange(dayjs(event.target.value).format('YYYY-MM-DD HH:mm'))
    };

    const handleClick = () => {
        setIsEditing(true);
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
                    type="datetime-local"
                    ref={inputRef}
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

export default InlineTimeEdit;