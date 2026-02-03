import { useState } from 'react';

function AddRecipe({ onAdd, onCancel }) {
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    prepTime: '',
    cookTime: '',
    serves: '4',
    instructions: '',
    tags: ''
  });

  // Initialize exactly 10 rows for ingredients
  const [ingredients, setIngredients] = useState(
    Array.from({ length: 10 }).map(() => ({ qty: '', unit: 'cup', item: '' }))
  );

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation: Check quantity numbers
    for (let i = 0; i < ingredients.length; i++) {
      const row = ingredients[i];
      // Only validate if quantity is provided
      if (row.qty && isNaN(Number(row.qty))) {
        setError(`Error: Quantity in row ${i + 1} must be a number.`);
        window.scrollTo(0, 0);
        return;
      }
    }

    // Filter out empty rows (optional cleanup, but keeping structure as is for data)
    const newRecipe = {
      ...formData,
      ingredients: ingredients
    };

    onAdd(newRecipe);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={validateAndSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Recipe Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Tags</label>
            <input 
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Dinner, Vegan"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Prep Time</label>
            <input 
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Cook Time</label>
            <input 
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Serves - Radio Buttons */}
        <div>
          <label className="block text-sm font-bold mb-2">Serves</label>
          <div className="flex space-x-4">
            {['1', '2', '4', '6', '8+'].map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="serves"
                  value={opt}
                  checked={formData.serves === opt}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ingredients Table */}
        <div>
          <label className="block text-sm font-bold mb-2">Ingredients</label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left w-24">Qty</th>
                  <th className="border p-2 text-left w-32">Unit</th>
                  <th className="border p-2 text-left">Item</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-1">
                      <input 
                        value={row.qty}
                        onChange={(e) => handleIngredientChange(i, 'qty', e.target.value)}
                        className="w-full p-1 bg-gray-50 focus:bg-white"
                        placeholder="0"
                      />
                    </td>
                    <td className="border p-1">
                      <select 
                        value={row.unit}
                        onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}
                        className="w-full p-1 bg-gray-50 focus:bg-white"
                      >
                        <option value="cup">cup</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </td>
                    <td className="border p-1">
                      <input 
                        value={row.item}
                        onChange={(e) => handleIngredientChange(i, 'item', e.target.value)}
                        className="w-full p-1 bg-gray-50 focus:bg-white"
                        placeholder="Ingredient name"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-bold mb-2">Instructions</label>
          <textarea 
            required
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="5"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
          >
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;