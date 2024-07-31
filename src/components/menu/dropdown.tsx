import React from 'react';

interface DropdownMenuProps {
  branches: string[];
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ branches, selectedBranch, onBranchChange }) => {
  return (
    <select
      value={selectedBranch}
      onChange={(e) => onBranchChange(e.target.value)}
      className="w-60 border border-gray-300 text-sm rounded px-3 py-1"
    >
      <option value="">All Locations</option>
      {branches.map((branch, index) => (
        <option key={index} value={branch}>{branch}</option>
      ))}
    </select>
  );
};

export default DropdownMenu;
