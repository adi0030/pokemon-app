import React from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
function Header({ searchTerm, setSearchTerm, typeFilter, setTypeFilter, types }) {
    return (
      <header className="bg-red-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Pokemon Explorer</h1>
          
          
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TypeFilter typeFilter={typeFilter} setTypeFilter={setTypeFilter} types={types} />
          </div>
        </div>
      </header>
    );
  }
  export default Header