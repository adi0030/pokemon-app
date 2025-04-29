import { Filter } from "lucide-react";
function TypeFilter({ typeFilter, setTypeFilter, types }) {
    const handleTypeFilterChange = (e) => {
      setTypeFilter(e.target.value);
    };
  
    return (
      <div className="relative">
        <select
          value={typeFilter}
          onChange={handleTypeFilterChange}
          className="pl-8 pr-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 appearance-none border-1"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
        <Filter className="absolute left-2 top-2.5 text-gray-500 h-4 w-4" />
      </div>
    );
  }

  export default TypeFilter