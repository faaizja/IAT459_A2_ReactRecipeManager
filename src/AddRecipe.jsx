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

    for (let i = 0; i < ingredients.length; i++) {
      const row = ingredients[i];
      if (row.qty && isNaN(Number(row.qty))) {
        setError(`⚠️ Oops! Row ${i + 1} has an invalid quantity number.`);
        window.scrollTo(0, 0);
        return;
      }
    }

    const newRecipe = { ...formData, ingredients: ingredients };
    onAdd(newRecipe);
  };

  const inputClass = "w-full border-2 border-stone-200 rounded-lg p-2.5 bg-stone-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all";
  const labelClass = "block text-sm font-bold text-stone-700 mb-1 tracking-wide";

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-stone-100">
      <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
        <h2 className="text-3xl font-serif font-bold text-stone-800">Write a New Recipe</h2>
        <button onClick={onCancel} className="text-stone-400 hover:text-red-500 text-2xl font-bold">&times;</button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-center">
          <span className="mr-2">🚨</span> {error}
        </div>
      )}

      <form onSubmit={validateAndSubmit} className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Recipe Name</label>
            <input 
              required
              name="name"
              placeholder="e.g. Grandma's Apple Pie"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClass} text-lg font-serif`}
            />
          </div>
          
          <div>
            <label className={labelClass}>Tags / Category</label>
            <input 
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Dessert, Gluten-Free"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Prep Time</label>
              <input 
                name="prepTime"
                placeholder="10 mins"
                value={formData.prepTime}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cook Time</label>
              <input 
                name="cookTime"
                placeholder="1 hr"
                value={formData.cookTime}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Serves */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
          <label className={labelClass}>Servings</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {['1', '2', '4', '6', '8+'].map((opt) => (
              <label key={opt} className="cursor-pointer relative">
                <input
                  type="radio"
                  name="serves"
                  value={opt}
                  checked={formData.serves === opt}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-stone-200 text-stone-500 font-bold peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:text-amber-700 transition-all hover:border-amber-300">
                  {opt}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="text-xl font-serif font-bold text-stone-800 mb-4 block">Ingredients List</label>
          <div className="border border-stone-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-stone-100 text-stone-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3 text-left w-24">Qty</th>
                  <th className="p-3 text-left w-32">Unit</th>
                  <th className="p-3 text-left">Item</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ingredients.map((row, i) => (
                  <tr key={i} className="bg-white hover:bg-stone-50 transition-colors">
                    <td className="p-2">
                      <input 
                        value={row.qty}
                        onChange={(e) => handleIngredientChange(i, 'qty', e.target.value)}
                        className="w-full p-2 rounded bg-transparent border border-transparent focus:border-amber-300 focus:bg-white outline-none text-center font-mono"
                        placeholder="-"
                      />
                    </td>
                    <td className="p-2">
                      <select 
                        value={row.unit}
                        onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}
                        className="w-full p-2 rounded bg-transparent border border-transparent focus:border-amber-300 focus:bg-white outline-none cursor-pointer"
                      >
                        <option value="cup">cup</option>
                        <option value="tbsp">tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                        <option value="lb">lb</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input 
                        value={row.item}
                        onChange={(e) => handleIngredientChange(i, 'item', e.target.value)}
                        className="w-full p-2 rounded bg-transparent border border-transparent focus:border-amber-300 focus:bg-white outline-none placeholder-stone-300"
                        placeholder="Ingredient..."
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
          <label className="text-xl font-serif font-bold text-stone-800 mb-2 block">Instructions</label>
          <textarea 
            required
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            placeholder="Step 1: Mix the dry ingredients..."
            className="w-full border-2 border-stone-200 rounded-lg p-4 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all leading-relaxed"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4 pt-4 border-t border-stone-100">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-3 text-stone-500 hover:text-stone-800 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-3 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 hover:shadow-lg transition-all font-bold tracking-wide transform active:scale-95"
          >
            Save to Cookbook
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;