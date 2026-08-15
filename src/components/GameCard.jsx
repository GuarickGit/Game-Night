function GameCard({ game, onToggleFavorite, onViewDetails }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
      {/* Image + bouton favori */}
      <div className="relative overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(game.id)}
          className={`absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl backdrop-blur transition hover:scale-105 ${
            game.favorite ? 'text-rose-600' : 'text-neutral-400'
          }`}
          aria-label="Ajouter aux favoris"
        >
          {game.favorite ? '♥' : '♡'}
        </button>
      </div>

      {/* Infos du jeu */}
      <div className="p-4">
        <h3 className="truncate font-bold text-neutral-900" title={game.title}>
          {game.title}
        </h3>

        <p className="mt-2 text-sm font-bold">
          <span className="text-amber-500">★</span>{' '}
          <span className="text-neutral-900">{game.rating}</span>{' '}
          <span className="text-blue-600">- {game.year}</span>
        </p>

        <p className="mt-1 font-semibold text-neutral-500">{game.genre}</p>

        {/* Voir le détail */}
        <button
          type="button"
          onClick={() => onViewDetails(game)}
          className="mt-4 w-full rounded-xl border border-neutral-400 bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-blue-600 hover:text-white hover:shadow-md"
        >
          Voir le détail
        </button>
      </div>
    </article>
  );
}

export default GameCard;
