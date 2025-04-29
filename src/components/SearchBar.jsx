import { Search } from "lucide-react";
function SearchBar({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-8 pr-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black text-gray-800 bg-white"
          autoComplete="off"
        />
        <Search className="absolute left-2 top-2.5 text-gray-500 h-4 w-4" />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
  export default SearchBar