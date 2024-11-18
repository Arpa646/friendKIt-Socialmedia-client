import React, { useState } from 'react';

function PrivacyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Public');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option:string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-[#f1f1f3] bg border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedOption}
        <svg
          className="w-5 h-5 ml-2 -mr-1 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-36 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleOptionClick('Public')}
              className="w-full px-4 py-2 text-sm  text-black hover:bg-gray-100"
            >
              Public
            </button>
            <button
              onClick={() => handleOptionClick('Only Me')}
              className="w-full text-black px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Only Me
            </button>
            <button
              onClick={() => handleOptionClick('Friend')}
              className="w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              Friend
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivacyDropdown;
