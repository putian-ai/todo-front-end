import React from 'react';
import { Importance } from './client';

interface Option {
    value: Importance;
    label: string;
}

interface InlineSelectEditProps {
    value: Importance;
    options: Option[];
    onChange: (newValue: Importance) => void;
}

const InlineSelectEdit: React.FC<InlineSelectEditProps> = ({ value, options, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(e.target.value, 10) as Importance);
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
