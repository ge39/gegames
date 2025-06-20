import Link from 'next/link';

export default function Console({ consoleName, games }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '80px', borderRadius: '10px' }}>
        {consoleName}
      </h2>

      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
        {games && games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>

      <nav style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link style={{ textDecoration: 'none', marginRight: '10px' }} href="/gamelistAtari">Atari</Link>
        <Link style={{ textDecoration: 'none', marginRight: '10px' }} href="/gamelistArcade">Arcade</Link>
        <Link style={{ textDecoration: 'none', marginRight: '10px' }} href="/gamelistGba">GBA</Link>
        <Link style={{ textDecoration: 'none', marginRight: '10px' }} href="/gamelistMegadrive">Megadrive</Link>
        <Link style={{ textDecoration: 'none', marginRight: '10px' }} href="/gamelistSnes">Super Nintendo</Link>
        <Link style={{ textDecoration: 'none' }} href="/gameslistPlaystation">Playstation</Link>
      </nav>
    </div>
  );
}
