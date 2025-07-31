import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PeerConnection from '../components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import SEOHead from '@/components/SEOHead';
import { arcadeGames } from '../data/arcadeGames';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os jogos pelo nome baseado no searchTerm
  const filteredGames = arcadeGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [favorites, setFavorites] = useState([]);

// Carrega favoritos do localStorage no carregamento da página
useEffect(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('arcadeFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }
}, []);

// Adiciona ou remove jogo dos favoritos
const toggleFavorite = (slug) => {
  let updated;
  if (favorites.includes(slug)) {
    updated = favorites.filter((fav) => fav !== slug);
  } else {
    updated = [...favorites, slug];
  }
  setFavorites(updated);
  localStorage.setItem('arcadeFavorites', JSON.stringify(updated));
};

// Verifica se um jogo é favorito
const isFavorite = (slug) => favorites.includes(slug);

  
  return (
    <>
      <SEOHead
        title="Jogos Arcade Online | GeGames"
        description="Jogue online os melhores jogos arcade dos anos 80 e 90 no GeGames. Clássicos como Metal Slug, Street Fighter, Cadillacs e muito mais!"
        keywords="arcade, jogos antigos, fliperama, jogar online, street fighter, metal slug"
        image="https://gegames.vercel.app/images/capa-arcade.png"
        url="https://gegames.vercel.app/gamelistArcade"
      />

      <Navbar />

      <main>
        <section id="arcadeSection">
          <Console />

          {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{ backgroundColor: 'transparent', color: '#fafafa', borderRadius: '10px', padding: '10px' }}>
              Lista de Jogos Arcade - {filteredGames.length}
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
              }}
            />
            <WhatsappButton />
          </div>

          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <Link
                  href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
                  passHref
                >
                  <div>
                    <h5>{game.name}</h5>
                    <Image
                      src={game.image}
                      alt={game.name}
                      className={styles.gameImage}
                      width={200}
                      height={200}
                      priority
                    />
                    <h5>Total Players: {game.players}</h5>
                  </div>
                </Link>
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

