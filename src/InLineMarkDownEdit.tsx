import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

interface InlineEditProps {
    value: string;

    onChange: (newValue: string) => void;
}

const InlineMarkDownEdit: React.FC<InlineEditProps> = ({ value, onChange }) => {
    const result = <Markdown>{value}</Markdown>
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(event.target.value);
        onChange(event.target.value)

        console.log(value)
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
                <textarea
                    ref={inputRef}
                    value={currentValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="inline-edit__input"
                />
            ) : (
                result
            )}
        </span>
    );
};

export default InlineMarkDownEdit;