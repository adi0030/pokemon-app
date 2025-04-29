// Main App Component
import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import LoadingState from "./components/LoadingState";
import PokemonList from "./components/PokemonList";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";


export default function PokemonExplorer() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  // // Fetch all Pokemon types
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon types');
        }
        return response.json();
      })
      .then(data => {
        // Filter out non-standard types
        const standardTypes = data.results.filter(type => 
          !['unknown', 'shadow'].includes(type.name)
        );
        setTypes(standardTypes);
      })
      .catch(err => {
        console.error('Error fetching Pokémon types:', err);
      });
  }, []);

  // Fetch the first 150 Pokémon
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get the list of first 150 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        
        // Fetch detailed information for each Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            try {
              const detailResponse = await fetch(pokemon.url);
              if (!detailResponse.ok) {
                throw new Error(`Failed to fetch details for ${pokemon.name}`);
              }
              return await detailResponse.json();
            } catch (error) {
              console.error(`Error fetching ${pokemon.name}:`, error);
              return null;
            }
          })
        );
        
        // Filter out any failed requests and format the data
        const formattedPokemon = pokemonDetails
          .filter(p => p !== null)
          .map(p => ({
            id: p.id,
            name: p.name,
            sprite: p.sprites.front_default,
            types: p.types.map(type => type.type.name),
          }));
        
        console.log("Loaded Pokémon:", formattedPokemon.map(p => p.name));
        setPokemon(formattedPokemon);
        setFilteredPokemon(formattedPokemon);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError('Failed to load Pokémon data. Please try again later.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokemon based on search term and type filter
  useEffect(() => {
    let results = pokemon;
    
    // Filter by name if search term exists
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      results = results.filter(p => 
        p.name.toLowerCase().includes(lowerSearch)
      );
      console.log(`Search term "${lowerSearch}" matched ${results.length} Pokémon`);
      if (results.length === 0) {
        console.log("Available Pokémon names:", pokemon.map(p => p.name).join(", "));
      }
    }
    
    // Filter by type if type filter is selected
    if (typeFilter) {
      results = results.filter(p => 
        p.types.includes(typeFilter)
      );
    }
    
    setFilteredPokemon(results);
  }, [searchTerm, typeFilter, pokemon]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        typeFilter={typeFilter} 
        setTypeFilter={setTypeFilter} 
        types={types}
      />

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredPokemon.length === 0 ? (
          <EmptyState />
        ) : (
          <PokemonList filteredPokemon={filteredPokemon} />
        )}
      </main>
    </div>
  );
}