import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div
      className="flex items-center border border-gray-400 rounded-lg 
                 bg-gray-200 dark:bg-gray-800 
                 focus-within:ring-2 focus-within:ring-blue-500 
                 hover:border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-all duration-300"
    >
      <span className="pl-3 pr-2 text-blue-500 text-lg">🔍</span>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent text-gray-800 dark:text-white 
                   p-2 rounded-r-lg focus:outline-none 
                   placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  );
}

export default SearchBar;
