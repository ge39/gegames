import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PeerConnection from '../components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import SEOHead from '@/components/SEOHead';
import { atariGames } from '../data/atariGames';
import StarsRating from '@/components/StarsRating';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';

export default function GamelistAtari() {
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
        title="Jogos Atari Online | GeGames"
        description="Jogue online os melhores jogos clássicos do Atari 2600 no GeGames. Títulos como Pitfall, River Raid, Pac-Man e muito mais!"
        keywords="atari, jogos antigos, atari 2600, jogar online, river raid, pac-man"
        image="https://gegames.vercel.app/images/capa-atari.png"
        url="https://gegames.vercel.app/gamelistAtari"
      />

      <Navbar />
     
      <Console />
          
      <main>
        <section id="atariSection">
         {/* Barra de busca e favoritos */}
          <div style={{ textAlign: 'center', marginTop: '-10px',marginBottom: '10px', padding: '0px' }}>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '0px' }}>
                {/* mostra os favoritos */}
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
                <div><WhatsappButton /></div>
                
              </div>
              <span style={{ color: '#fafafa', fontWeight: 'bold', margin: '10px 0' }}>Lista de Jogos Atari - {filteredGames.length}</span>
            </div>


          {/* Lista de jogos */}
          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
               <h5>{game.name}</h5>
                <Link
                  href={`/emulation?jogo=${encodeURIComponent(
                    game.path
                  )}&core=${encodeURIComponent(game.core)}`}
                  passHref
                >
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
                      {game.desc}
                      <br />
                      {game.genre}
                      <br />
                      Players: {game.players}
                    </h5>
                    <div>
                      <StarsRating rating={game.rating} />⭐
                    </div>
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
