import { Loader } from "lucide-react";
function LoadingState() {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader className="animate-spin h-12 w-12 text-red-600 mb-4" />
          <p className="text-lg">Loading Pokémon data...</p>
        </div>
      </div>
    );
  }
  export default LoadingState
  
  
  
 