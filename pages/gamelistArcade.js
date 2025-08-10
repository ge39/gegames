// pages/gamelistArcade.js
import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { seoData } from '@/data/seoData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PeerConnection from '@/components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import Carousel from '../components/Carousel';
import { arcadeGames } from '@/data/arcadeGames';
import '@/styles/Globals.css';

export default function GamelistArcade() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Carrega favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('arcadeFavorites');
      if (stored) setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('arcadeFavorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.includes(id);

  // Filtra jogos por busca e favoritos
  const filteredGames = arcadeGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

  // Agrupa os jogos filtrados por gênero (genre)
  const gamesByGenre = filteredGames.reduce((acc, game) => {
    if (!acc[game.genre]) {
      acc[game.genre] = [];
    }
    acc[game.genre].push(game);
    return acc;
  }, {});

  return (
    <>
      <SEOHead {...seoData.arcade} />
      <Navbar />
      <Console />
      <main>
        <section id="arcadeSection" style={{ padding: '0 10px' }}>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '80%',
                maxWidth: '500px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '10px',
              }}
            />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}>
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
              <WhatsappButton />
            </div>
            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
              ARCADE: {filteredGames.length} JOGOS
            </span>
          </div>

          {/* Exibe um carrossel para cada gênero */}
          {Object.entries(gamesByGenre).map(([genre, games]) => (
            <section key={genre} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '16px', fontFamily:  'Press Start 2P', color: '#FFD700', margin: '10px', borderRadius:'12px', padding:'5px 10px', background:'#666' }}>{genre}</h2>
              <Carousel games={games.map(game => ({
                ...game,
                // Adiciona propriedades para controle de favorito no GameCard via prop extra
                isFavorite: isFavorite(game.id),
                toggleFavorite,
              }))} />
            </section>
          ))}

        </section>
      </main>
      <PeerConnection peerId={null} />
      <Footer />
    </>
  );
}
