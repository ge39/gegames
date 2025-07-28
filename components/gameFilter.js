import { useState } from 'react';

export default function GameFilter({ onFilter }) {
  const [search, setSearch] = useState('');
  const [consoleType, setConsoleType] = useState('');
  const [players, setPlayers] = useState('');

  const handleFilter = () => {
    onFilter({ search, consoleType, players });
  };

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow-md space-y-4">
      <input
        type="text"
        placeholder="🔍 Buscar jogo"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          value={consoleType}
          onChange={(e) => setConsoleType(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="">🎮 Console</option>
          <option value="snes">SNES</option>
          <option value="arcade">Arcade</option>
          <option value="megadrive">Mega Drive</option>
        </select>

        <select
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="">👥 Jogadores</option>
          <option value="1">1 Jogador</option>
          <option value="2">2 Jogadores</option>
          <option value="4">Até 4 Jogadores</option>
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-yellow-500 text-black font-bold py-2 rounded hover:bg-yellow-400 transition"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}

