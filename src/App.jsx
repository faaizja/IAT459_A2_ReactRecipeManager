import { useState } from 'react';
import Nav from './Nav';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import RecipeDetails from './RecipeDetails';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'add', 'details'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleAddRecipe = (newRecipe) => {
    const recipeWithId = { ...newRecipe, id: Date.now() };
    setRecipes([...recipes, recipeWithId]);
    setCurrentView('home');
  };

  const handleViewDetails = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('details');
  };

  const getSelectedRecipe = () => {
    return recipes.find((recipe) => recipe.id === selectedRecipeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Nav setCurrentView={setCurrentView} />
      
      <main className="container mx-auto p-4">
        {currentView === 'home' && (
          <RecipeList 
            recipes={recipes} 
            onViewDetails={handleViewDetails} 
          />
        )}

        {currentView === 'add' && (
          <AddRecipe 
            onAdd={handleAddRecipe} 
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'details' && (
          <RecipeDetails 
            recipe={getSelectedRecipe()} 
            onBack={() => setCurrentView('home')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;