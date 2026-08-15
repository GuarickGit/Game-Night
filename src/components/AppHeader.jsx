function AppHeader({ currentView, onNavigate, favoriteCount }) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + Nom */}
        <button className="text-left text-xl font-black tracking-tight text-neutral-900">
          GAME NIGHT
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('jeux')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              currentView === 'jeux'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Jeux
          </button>
          <button
            type="button"
            onClick={() => onNavigate('favoris')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              currentView === 'favoris'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            ♥ Favoris {favoriteCount}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
