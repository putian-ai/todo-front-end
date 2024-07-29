import React from 'react';
import { IMPORTANCE } from './client';

interface Option {
    value: IMPORTANCE;
    label: string;
}

interface InlineSelectEditProps {
    value: IMPORTANCE;
    options: Option[];
    onChange: (newValue: IMPORTANCE) => void;
}

const InlineSelectEdit: React.FC<InlineSelectEditProps> = ({ value, options, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(e.target.value, 10) as IMPORTANCE);
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
