// Faaiz Abdullah 301472058
// IAT 459 Assignment 2 - React Recipe Manager


import { useState } from 'react';
import Nav from './Nav';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import RecipeDetails from './RecipeDetails';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]); // array of recipes 
  const [currentView, setCurrentView] = useState('home'); // decides which view to show user
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // the selected recipe at the moment

  const addRecipeHandler = (newRecipe) => {
    const recipeWithId = { 
      ...newRecipe, 
      id: Date.now() 
    };
    
    const updatedRecipes = [...recipes, recipeWithId];
    setRecipes(updatedRecipes);
    
    setCurrentView('home');
  };

  const viewDetailsHandler = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('details');
  };

  const getActiveRecipe = () => {
    return recipes.find((r) => r.id === selectedRecipeId);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans">
      <Nav currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto p-4 md:p-8 max-w-5xl">

      {/* below the view state depends on the value of current view */}

        {currentView === 'home' && (
          <RecipeList 
            recipes={recipes} 
            onViewDetails={viewDetailsHandler} 
          />
        )}

        {currentView === 'add' && (
          <AddRecipe 
            onSave={addRecipeHandler} 
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'details' && (
          <RecipeDetails 
            recipe={getActiveRecipe()} 
            onBack={() => setCurrentView('home')} 
          />
        )}

      </main>
    </div>
  );
}

export default App;