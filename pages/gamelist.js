import { useState } from 'react';

export default function GameList() {
  const allGames = [/* lista de jogos com nome, console, players, etc */];
  const [filteredGames, setFilteredGames] = useState(allGames);

  const handleFilter = ({ search, consoleType, players }) => {
    let filtered = allGames;

    if (search) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (consoleType) {
      filtered = filtered.filter(game => game.console === consoleType);
    }

    if (players) {
      filtered = filtered.filter(game => game.players >= parseInt(players));
    }

    setFilteredGames(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <GameFilter onFilter={handleFilter} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGames.map((game, index) => (
          <div key={index} className="bg-gray-900 text-white p-2 rounded">
            <img src={game.image} alt={game.name} className="w-full rounded" />
            <h3 className="mt-2 font-bold text-center">{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

