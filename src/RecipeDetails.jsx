function RecipeDetails({ recipe, onBack }) {
  
    // if the recipe does not exist
  if (!recipe) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-400">Error: Recipe not found.</h2>
        <button onClick={onBack} className="mt-4 text-stone-500 underline hover:text-stone-800">
          Back to List
        </button>
      </div>
    );
  }

  const displayIngredients = recipe.ingredients.filter(ing => ing.item !== '');

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-stone-500 hover:text-amber-700 font-medium transition-colors group"
      >
        <span className="bg-white border border-stone-200 rounded-full w-8 h-8 flex items-center justify-center mr-2 group-hover:border-amber-400">←</span>
        Back to List
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
        
        <div className="bg-amber-50 p-8 border-b border-amber-100">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
            {recipe.name}
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {recipe.tags && (
              <span className="inline-block bg-white text-stone-600 px-4 py-1.5 rounded-full text-sm font-bold border border-stone-200 shadow-sm">
                Tags: {recipe.tags}
              </span>
            )}
            <div className="flex items-center space-x-4 bg-white px-4 py-1.5 rounded-full border border-stone-200 text-sm font-medium text-stone-600 shadow-sm">
              <span> Prep Time: {recipe.prepTime}</span>
              <span className="w-px h-4 bg-stone-300"></span>
              <span>Cook Time: {recipe.cookTime}</span>
              <span className="w-px h-4 bg-stone-300"></span>
              <span>Serves: {recipe.serves}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          
          <div className="p-8 bg-white md:col-span-1">
            <h3 className="text-xl font-serif font-bold text-amber-700 mb-6 flex items-center">
                Ingredients
            </h3>
            
            <table className="w-full text-sm text-stone-700">
              <tbody>
                {displayIngredients.length > 0 ? (
                  displayIngredients.map((ing, i) => (
                    <tr key={i} className="border-b border-stone-50 last:border-0">
                      <td className="py-2 font-bold text-stone-800 align-top w-12 text-right pr-2">
                        {ing.qty}
                      </td>
                      <td className="py-2 text-stone-500 align-top w-12 italic">
                        {ing.unit}
                      </td>
                      <td className="py-2 align-top pl-2">
                        {ing.item}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td className="text-stone-400 italic">No ingredients listed.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-8 md:col-span-2 bg-white">
            <h3 className="text-xl font-serif font-bold text-amber-700 mb-6 flex items-center">
              Instructions
            </h3>
            <div className="prose prose-stone max-w-none text-stone-700 leading-8 whitespace-pre-wrap">
              {recipe.instructions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;