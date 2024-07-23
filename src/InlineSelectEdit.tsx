import React from 'react';

interface Option {
    value: number;
    label: string;
}

interface InlineSelectEditProps {
    value: number;
    options: Option[];
    onChange: (newValue: number) => void;
}

const InlineSelectEdit: React.FC<InlineSelectEditProps> = ({ value, options, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(e.target.value, 10));
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default InlineSelectEdit;
