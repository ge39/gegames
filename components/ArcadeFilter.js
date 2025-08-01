import { useState } from 'react';
import Image from 'next/image'; // ✅ Importação adicionada
import { arcadeGames } from '../data/arcadeGames';

const ArcadeFilter = () => {
  const [players, setPlayers] = useState('');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');

  const filterGames = arcadeGames.filter(game => {
    const matchesPlayers = players ? game.players === players : true;

    const releaseYear = new Date(game.releasedate).getFullYear();
    const matchesYear = year
      ? (year === '80s' && releaseYear < 1990) ||
        (year === '90s' && releaseYear >= 1990 && releaseYear < 2000) ||
        (year === '2000s' && releaseYear >= 2000)
      : true;

    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());

    return matchesPlayers && matchesYear && matchesSearch;
  });

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar jogo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={players} onChange={e => setPlayers(e.target.value)}>
          <option value="">Todos jogadores</option>
          <option value="1">1 jogador</option>
          <option value="1-2">1-2 jogadores</option>
          <option value="1-3">1-3 jogadores</option>
          <option value="1-4">1-4 jogadores</option>
        </select>

        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">Todos anos</option>
          <option value="80s">Anos 80</option>
          <option value="90s">Anos 90</option>
          <option value="2000s">Anos 2000</option>
        </select>
      </div>

      <div className="game-list">
        {filterGames.map(game => (
          <div key={game.id} className="game-card">
            <Image
              src={game.image}
              alt={game.alt}
              width={300} // 🔧 Ajuste os valores conforme o layout
              height={200}
              style={{ objectFit: 'cover', borderRadius: '6px' }}
            />
            <h3>{game.name}</h3>
            <p>{game.desc}</p>
            <p><strong>Jogadores:</strong> {game.players}</p>
            <p><strong>Lançamento:</strong> {new Date(game.releasedate).getFullYear()}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .game-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }
        .game-card {
          background: #111;
          color: #fff;
          padding: 1rem;
          border-radius: 8px;
        }
        input, select {
          padding: 0.5rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ArcadeFilter;
