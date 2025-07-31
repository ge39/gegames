import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/GamelistArcade.module.css'; // reutiliza o estilo
import { atariGames } from '../data/gamesData'; // substitua pelo caminho correto do seu array

export default function GamelistAtari() {
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('atariFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('atariFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId) => {
    setFavorites((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const isFavorite = (gameId) => favorites.includes(gameId);

  const filteredGames = showOnlyFavorites
    ? atariGames.filter((game) => favorites.includes(game.id))
    : atariGames;

  return (
    <>
      <Head>
        <title>Jogos Atari | GegaMes</title>
        <meta name="description" content="Jogue os melhores clássicos do Atari online!" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Jogos Atari</h1>

        {/* Botão para alternar favoritos */}
        <div style={{ margin: '10px' }}>
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: showOnlyFavorites ? '#e63946' : '#2a9d8f',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {showOnlyFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
          </button>
        </div>

        {/* Lista de jogos */}
        <div className={styles.grid}>
          {filteredGames.map((game) => (
            <div key={game.id} className={styles.card}>
              <img
                src={game.image}
                alt={game.name}
                className={styles.gameImage}
              />
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <p><strong>Jogadores:</strong> {game.players}</p>
              <p><strong>Data de Lançamento:</strong> {game.releaseDate}</p>

              {/* Botão de favorito estilizado */}
              <button
                className={styles.favoriteButton}
                onClick={() => toggleFavorite(game.id)}
                aria-label={
                  isFavorite(game.id)
                    ? `Remover ${game.name} dos favoritos`
                    : `Adicionar ${game.name} aos favoritos`
                }
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isFavorite(game.id) ? '#e63946' : '#2a9d8f',
                  color: '#fff',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                {isFavorite(game.id) ? '💔 Remover' : '❤️ Favoritar'}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
