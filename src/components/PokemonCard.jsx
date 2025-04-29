
function PokemonCard({ pokemon }) {
   
    const typeColors = {
      normal: 'bg-gray-300',
      fire: 'bg-red-400',
      water: 'bg-blue-400',
      grass: 'bg-green-400',
      electric: 'bg-yellow-300',
      ice: 'bg-blue-200',
      fighting: 'bg-red-500',
      poison: 'bg-purple-400',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-400',
      bug: 'bg-green-500',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-600',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-700',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
          <span className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        
        <div className="flex justify-center bg-gray-100 p-2">
          <img 
            src={pokemon.sprite} 
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
          />
        </div>
        
        <div className="p-4 flex gap-2 flex-wrap">
          {pokemon.types.map(type => (
            <span 
              key={type}
              className={`${typeColors[type] || 'bg-gray-200'} px-3 py-1 rounded-full text-sm font-medium text-white`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
      </div>
    );
  }
  export default PokemonCard