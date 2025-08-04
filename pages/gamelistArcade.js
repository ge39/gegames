import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PeerConnection from '@/components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import StarsRating from '@/components/StarsRating';
// import ArcadeFilter from '@/components/ArcadeFilter';

import { arcadeGames } from '@/data/arcadeGames';
import styles from '@/styles/GamelistArcade.module.css';
import '@/styles/Globals.css';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('arcadeFavorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
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

  const filteredGames = arcadeGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

  const seoData = {
    title: "Jogos Arcade Online | GeGames",
    description: "Jogue online os melhores jogos arcade dos anos 80 e 90 no GeGames. Clássicos como Metal Slug, Street Fighter, Cadillacs e muito mais!",
    image: "https://gegames.vercel.app/images/capa-arcade.png",
    url: "https://gegames.vercel.app/gamelistArcade",
  };

  return (
    <>
      <SEOHead {...seoData} />
      <Navbar />
      <main>
        <Console />
        <section id="arcadeSection">
          <div style={{ textAlign: 'center', margin: '20px' }}>
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
              margin: '10px 0'
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
            <span style={{ color: '#fafafa', fontWeight: 'bold' }}>
              Lista de Jogos Arcade - {filteredGames.length}
            </span>
          </div>

          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <Link
                  href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
                  passHref
                >
                  <h5>{game.name}</h5>
                  <Image
                    src={game.image}
                    alt={`Capa do jogo ${game.name}`}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                </Link>
                <h5>
                  {game.desc}<br />
                  {game.genre}<br />
                  Players: {game.players}
                </h5>
                <StarsRating rating={game.rating} />
                <button
                  className={styles.favoriteButton}
                  onClick={() => toggleFavorite(game.id)}
                  aria-label={isFavorite(game.id)
                    ? `Remover ${game.name} dos favoritos`
                    : `Adicionar ${game.name} aos favoritos`}
                >
                  {isFavorite(game.id) ? '💔 Remover' : '❤️ Favoritar'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <PeerConnection peerId={null} />
      <Footer />
    </>
  );
}
