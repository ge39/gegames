import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PeerConnection from '../components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import SEOHead from '@/components/SEOHead';
import { atariGames } from '../data/atariGames.js';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';
import { useRouter } from 'next/router';

export default function Gamelist() {
  const { query } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Carrega favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('atariFavorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  // Adiciona ou remove jogo dos favoritos
  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('atariFavorites', JSON.stringify(updated));
  };

  // Verifica se um jogo é favorito
  const isFavorite = (id) => favorites.includes(id);

  // Filtra os jogos por nome e favoritos (se ativado)
  const filteredGames = atariGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

  return (
    <>
      <SEOHead
        title="Jogos Atari 2600 Online | GeGames"
        description="Jogue online os jogos clássicos do Atari 2600! Reviva títulos lendários como Pitfall, River Raid, Enduro, Pac-Man e outros diretamente no seu navegador."
        keywords="atari, atari 2600, jogos atari online, jogos antigos, retro games, river raid, pac-man, pitfall, gegames"
        image="https://gegames.vercel.app/images/capa-atari.png"
        url="https://gegames.vercel.app/gamelistAtari"
      />

      <Navbar />

      <main>
        <section id="atariSection">
          <Console />
          <PeerConnection peerId={query.peerId} />

          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{ backgroundColor: 'transparent', color: '#fafafa', borderRadius: '10px', padding: '10px' }}>
              Lista de Jogos Atari - {filteredGames.length}
            </h4>

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
                border: '1px solid #ccc'
              }}
            />

            {/* Botão para filtrar favoritos */}
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  backgroundColor: showOnlyFavorites ? '#FFD700' : '#444',
                  color: showOnlyFavorites ? '#000' : '#fff',
                  cursor: 'pointer'
                }}
              >
                {showOnlyFavorites ? 'Mostrar Todos' : 'Mostrar Só Favoritos'}
              </button>
            </div>

            <WhatsappButton />
          </div>

          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <Link href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}>
                  <h5>{game.name}</h5>
                  <Image
                    src={game.image}
                    alt={game.name}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                  <h5>{"Total Players: " + game.players}</h5>
                </Link>
                <button
                  onClick={() => toggleFavorite(game.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: isFavorite(game.id) ? 'red' : '#aaa'
                  }}
                  title="Favorito"
                >
                  {isFavorite(game.id) ? '❤️' : '🤍'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
