import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-64">
            {/* Dropdown button */}
            <button 
                className="bg-green-500 text-white p-2 w-full rounded-lg flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption || "Select an option"}</span>
                <ChevronDownIcon className="w-5 h-5"/>
            </button>

            {/* Dropdown options */}
            {isOpen && (
                <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto shadow-lg">
                    {options.map((option, index) => (
                        <li 
                            key={index} 
                            className="cursor-pointer hover:bg-green-500 hover:text-white p-2"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Prop validation
Dropdown.propTypes = {
    options: PropTypes.string.isRequired, // Debe ser un string
    selectedOption: PropTypes.string.isRequired, // Debe ser un número
    setSelectedOption: PropTypes.string.isRequired // Debe ser un número
};

export {Dropdown}