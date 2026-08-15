import { useState, useEffect, useMemo } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import GameCard from './components/GameCard';
import GameDetails from './components/GameDetails';

function App() {
  // [useStates]
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  const [currentView, setCurrentView] = useState('jeux');
  const [selectedGame, setSelectedGame] = useState(null);

  // [useMemos]
  // filteredGames : liste des jeux dont le titre contient la recherche (insensible à la casse)
  // recalculé uniquement si games ou search changent
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedGenre === 'Tous' || game.genre === selectedGenre),
    );
  }, [games, search, selectedGenre]);

  // favoriteCount : nombre de jeux marqués comme favoris
  const favoriteCount = useMemo(() => {
    return games.filter((game) => game.favorite).length;
  }, [games]);

  // favoriteGames : liste des jeux marqués comme favoris
  const favoriteGames = useMemo(() => {
    return games.filter((game) => game.favorite);
  }, [games]);

  // [Genres disponibles]
  // Transforme le tableau de jeux en tableau de genres, élimine les doublons
  // le ... reconvertit ce Set en vrai tableau JS classique
  const genres = [...new Set(games.map((game) => game.genre))];

  // [useEffects]
  useEffect(() => {
    loadGames();
  }, []);

  // [Fonctions]
  async function loadGames() {
    setErrorMessage('');
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch('/data/games.json');
      if (!response.ok) {
        throw new Error('Une erreur est survenue pendant le chargement.');
      }
      const data = await response.json();

      setGames(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Inverse la propriété favorite du jeu correspondant à gameId
  // Crée un nouveau tableau (via .map) plutôt que de modifier games directement
  function toggleFavorite(gameId) {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === gameId ? { ...game, favorite: !game.favorite } : game,
      ),
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      {/* [Header] */}
      <AppHeader
        currentView={currentView}
        onNavigate={setCurrentView}
        favoriteCount={favoriteCount}
      />

      {/* [Main] */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <section>
          {currentView === 'jeux' && (
            <>
              {/* Hero */}
              <div className="max-w-2xl">
                <p className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                  Votre soirée commence ici
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  Quel jeu pour ce soir ?
                </h1>
                <p className="mt-4 text-neutral-500">
                  Recherchez un jeu, filtrez par catégorie et gardez vos
                  favoris.
                </p>
              </div>

              {/* SearchBar */}
              {!isLoading && !errorMessage && (
                <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un jeu..."
                    className="w-full rounded-2xl border border-neutral-400 bg-white px-4 py-3 text-neutral-900 transition outline-none placeholder:text-neutral-400 focus:border-blue-500"
                  />

                  {/* Filtres */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGenre('Tous')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        selectedGenre === 'Tous'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      Tous
                    </button>

                    {genres.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => setSelectedGenre(genre)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          selectedGenre === genre
                            ? 'bg-blue-600 text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skeleton */}
              {isLoading && (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                    >
                      <div className="aspect-2/3 w-full bg-neutral-200"></div>
                      <div className="space-y-2 p-4">
                        <div className="h-4 w-3/4 rounded bg-neutral-200"></div>
                        <div className="h-3 w-1/2 rounded bg-neutral-200"></div>
                        <div className="h-3 w-1/3 rounded bg-neutral-200"></div>
                        <div className="mt-4 h-9 w-full rounded-xl bg-neutral-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Erreur */}
              {errorMessage && (
                <div className="flex flex-col items-center py-20 text-center">
                  <p className="font-bold text-neutral-900">
                    Impossible de charger les jeux
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {errorMessage}
                  </p>

                  <button
                    type="button"
                    onClick={loadGames}
                    className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {/* GameCards */}
              {!isLoading && !errorMessage && (
                <>
                  {filteredGames.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredGames.map((game) => (
                        <GameCard
                          key={game.id}
                          game={game}
                          onToggleFavorite={toggleFavorite}
                          onViewDetails={setSelectedGame}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <p className="font-bold text-neutral-900">
                        Aucun jeu trouvé
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        Essayez une autre recherche ou réinitialisez vos
                        filtres.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSearch('');
                          setSelectedGenre('Tous');
                        }}
                        className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {currentView === 'favoris' && (
            <>
              {/* Hero */}
              <div className="max-w-2xl">
                <p className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                  Ma sélection
                </p>
                <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  Mes favoris
                </h1>
                <p className="mt-4 text-neutral-500">
                  Retrouvez ici les jeux que vous avez gardés pour plus tard.
                </p>
              </div>

              {/* FavoriteCards */}
              {favoriteGames.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {favoriteGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onToggleFavorite={toggleFavorite}
                      onViewDetails={setSelectedGame}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 py-20 text-center">
                  <p className="text-xl font-bold text-neutral-900">
                    Aucun favori pour le moment
                  </p>
                  <p className="mt-2 text-neutral-500">
                    Retournez dans Jeux et cliquez sur un cœur pour commencer
                    votre sélection.
                  </p>

                  <button
                    type="button"
                    onClick={() => setCurrentView('jeux')}
                    className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 font-bold text-white hover:bg-neutral-800"
                  >
                    Voir les jeux
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* [Modal] */}
      {selectedGame && (
        <GameDetails
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* [Footer] */}
      <AppFooter />
    </div>
  );
}

export default App;
