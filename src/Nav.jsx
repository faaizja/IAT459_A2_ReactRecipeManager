function Nav({ setCurrentView, currentView }) {
  return (
    <nav className="bg-amber-700 text-amber-50 shadow-lg border-b-4 border-amber-800">
      <div className="container px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 
          className="text-3xl font-serif font-bold tracking-wide cursor-pointer hover:text-white transition-colors"
          onClick={() => setCurrentView('home')}
        >
         My Kitchen
        </h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setCurrentView('home')}
            className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
              currentView === 'home' 
                ? 'bg-amber-900 text-white shadow-inner' 
                : 'hover:bg-amber-600 text-amber-100'
            }`}
          >
            All Recipes
          </button>
          <button 
            onClick={() => setCurrentView('add')}
            className={`hover:cursor-pointer px-5 py-2 rounded-full font-bold shadow-md transition-transform transform active:scale-95 ${
              currentView === 'add'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-white text-amber-800 hover:bg-amber-50'
            }`}
          >
            Add New Recipe
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;