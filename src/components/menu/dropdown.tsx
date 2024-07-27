import React, { useState } from 'react';

interface DropdownMenuProps {
  branches: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ branches }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const handleSelect = (branch: string) => {
    setSelectedBranch(branch);
    setIsOpen(false);
  };

  return (
    <div className=" relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className=" text-white px-2 py-2 w-full rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        style={{  backgroundColor: '#181059' }}
      >
        {selectedBranch || 'Pilih Kantor'}
        <svg className="w-5 h-5 inline ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className=" absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {branches.map((branch, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(branch)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {branch}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

