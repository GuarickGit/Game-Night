function GameDetails({ game, onClose, onToggleFavorite }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-neutral-900/60 p-4 backdrop-blur-sm">
      <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white shadow-2xl">
        <div className="grid md:grid-cols-[260px_1fr]">
          <img
            src={game.image}
            alt={game.title}
            className="h-full w-full object-cover"
          />

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                  {game.genre}
                </p>
                <h2 className="mt-2 text-3xl font-black text-neutral-900">
                  {game.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-neutral-600">
              <span>{game.year}</span>
              <span>•</span>
              <span>{game.platform}</span>
              <span>•</span>
              <span className="font-bold text-amber-600">★ {game.rating}</span>
            </div>

            <p className="mt-6 leading-7 text-neutral-600">
              {game.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onToggleFavorite(game.id)}
                className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {game.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-neutral-900 px-5 py-2.5 font-bold text-white hover:bg-neutral-800"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default GameDetails;
