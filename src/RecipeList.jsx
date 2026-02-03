function RecipeList({ recipes, onViewDetails }) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center p-8 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50">
        <div className="text-6xl mb-4">🥣</div>
        <h2 className="text-2xl font-serif font-bold text-stone-600">Your kitchen is empty.</h2>
        <p className="text-stone-500 mt-2 max-w-xs mx-auto">
          It's time to get cooking! Click the "New Recipe" button above to add your first dish.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b-2 border-stone-200 pb-2">
        <h2 className="text-3xl font-serif font-bold text-stone-800">My Recipes</h2>
        <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-sm font-bold">
          {recipes.length} {recipes.length === 1 ? 'Dish' : 'Dishes'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            onClick={() => onViewDetails(recipe.id)}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-stone-200 hover:border-amber-300 transition-all cursor-pointer overflow-hidden flex flex-col h-full"
          >
            <div className="h-2 bg-amber-500 w-full group-hover:bg-amber-400 transition-colors"></div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif font-bold mb-3 text-stone-800 group-hover:text-amber-700 transition-colors">
                {recipe.name}
              </h3>
              
              <div className="mt-auto space-y-2 text-sm text-stone-600">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span>⏱️ Prep</span>
                  <span className="font-semibold">{recipe.prepTime}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span>🔥 Cook</span>
                  <span className="font-semibold">{recipe.cookTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>🍽️ Serves</span>
                  <span className="font-semibold">{recipe.serves}</span>
                </div>
              </div>
            </div>
            <div className="bg-stone-50 p-3 text-center text-xs font-bold text-stone-400 uppercase tracking-wider group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              View Details
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;