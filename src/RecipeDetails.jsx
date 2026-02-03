function RecipeDetails({ recipe, onBack }) {
  if (!recipe) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl">Error: Recipe not found.</p>
        <button 
          onClick={onBack} 
          className="mt-4 text-blue-600 underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  // Filter out ingredients that have no item name to keep the display clean
  const validIngredients = recipe.ingredients.filter(ing => ing.item.trim() !== '');

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <button 
        onClick={onBack}
        className="mb-6 text-gray-500 hover:text-blue-600 flex items-center"
      >
        ← Back to List
      </button>

      <div className="border-b pb-4 mb-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <strong>Prep:</strong> {recipe.prepTime}
            </span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <strong>Cook:</strong> {recipe.cookTime}
            </span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                <strong>Serves:</strong> {recipe.serves}
            </span>
            {recipe.tags && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    🏷️ {recipe.tags}
                </span>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Ingredients</h3>
            <table className="w-full text-sm">
                <tbody>
                    {validIngredients.length > 0 ? (
                        validIngredients.map((ing, i) => (
                            <tr key={i} className="border-b last:border-0">
                                <td className="py-2 font-semibold text-gray-700 w-16">
                                    {ing.qty} {ing.unit}
                                </td>
                                <td className="py-2 text-gray-600">{ing.item}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td className="py-2 text-gray-500 italic">No ingredients listed.</td></tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Instructions</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {recipe.instructions}
            </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;