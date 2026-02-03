function Nav({ setCurrentView }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipe Manager</h1>
        <div className="space-x-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 hover:bg-blue-700 rounded transition-colors"
          >
            All Recipes
          </button>
          <button 
            onClick={() => setCurrentView('add')}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            Add New Recipe
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;