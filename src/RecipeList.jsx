function RecipeList({ recipes, onViewDetails }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-gray-500">No recipes available.</h2>
        <p className="text-gray-400 mt-2">Click "Add New Recipe" to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            onClick={() => onViewDetails(recipe.id)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{recipe.name}</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Prep:</span> {recipe.prepTime}</p>
                <p><span className="font-semibold">Cook:</span> {recipe.cookTime}</p>
                <p><span className="font-semibold">Serves:</span> {recipe.serves}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;