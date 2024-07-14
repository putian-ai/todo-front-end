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
        console.log(isEditing)
        setIsEditing(false);
        console.log(isEditing)
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(event.target.value);
        onChange(event.target.value)
        console.log(event.target.value)
    };

    const handleClick = () => {
        console.log('Click')
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing) {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }, [isEditing])


    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    return (
        <span
            onClick={handleClick}
            className="min-h-4 min-w-4"
        >
            {(!value && !isEditing) ? (
                <span className="text-gray-400">What to do?</span>

            ) : isEditing ? (
                <textarea
                    ref={inputRef}
                    value={currentValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="What to do?"
                    className="inline-edit__input"
                />
            ) : (
                result
            )}
        </span>
    );
};

export default InlineMarkDownEdit;