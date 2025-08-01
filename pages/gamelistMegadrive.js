import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PeerConnection from '../components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import SEOHead from '@/components/SEOHead';
import { megadriveGames } from '../data/MegadriveGames';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Carrega favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('megadriveFavorites');
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
    localStorage.setItem('megadriveFavorites', JSON.stringify(updated));
  };

  // Verifica se um jogo é favorito
  const isFavorite = (id) => favorites.includes(id);

  // Filtra os jogos por nome e favoritos (se ativado)
  const filteredGames = megadriveGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

  return (
    <>
      <SEOHead
        title="Jogos Mega Drive Online | GeGames"
        description="Jogue online os clássicos do Sega Mega Drive! Relembre títulos como Sonic, Streets of Rage, Golden Axe e muito mais direto no seu navegador."
        keywords="mega drive, sega, sonic, streets of rage, golden axe, jogos antigos, retro games, gegames, jogar online"
        image="https://gegames.vercel.app/images/capa-megadrive.png"
        url="https://gegames.vercel.app/gamelistMegadrive"
      />

      <Navbar />

      <main>
        <section id="megaSection">
          <Console />

          {/* Barra de busca e favoritos */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4
              style={{
                backgroundColor: 'transparent',
                color: '#fafafa',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              Lista de Jogos Megadrive - {filteredGames.length}
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
                border: '1px solid #ccc',
                marginBottom: '10px',
              }}
            />

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

            <WhatsappButton />
          </div>

          {/* Lista de jogos */}
          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <Link
                  href={`/emulation?jogo=${encodeURIComponent(
                    game.path
                  )}&core=${encodeURIComponent(game.core)}`}
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
                    <h5>Total Players: {game.players}</h5>
                  </Link>

                <button
                  className={styles.favoriteButton}
                  onClick={() => toggleFavorite(game.id)}
                  aria-label={
                    isFavorite(game.id)
                      ? `Remover ${game.name} dos favoritos`
                      : `Adicionar ${game.name} aos favoritos`
                  }
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
