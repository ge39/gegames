import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PeerConnection from '../components/PeerConnection';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console';
import SEOHead from '@/components/SEOHead';
import { gbaGames } from '../data/gbaGames';
import StarsRating from '@/components/StarsRating';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Carrega favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gbaFavorites');
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
    localStorage.setItem('gbaFavorites', JSON.stringify(updated));
  };

  // Verifica se um jogo é favorito
  const isFavorite = (id) => favorites.includes(id);

  // Filtra os jogos por nome e favoritos (se ativado)
  const filteredGames = gbaGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

  return (
    <>
      <SEOHead
        title="Jogos GBA Online | GeGames"
        description="Jogue online os melhores títulos do Game Boy Advance! Reviva clássicos como Pokémon, Metroid, Mario Kart, Castlevania e outros diretamente no seu navegador."
        keywords="gba, game boy advance, jogos gba online, pokémon, metroid, mario, castlevania, retro games, gegames"
        image="https://gegames.vercel.app/images/capa-gba.png"
        url="https://gegames.vercel.app/gamelistGba"
      />

      <Navbar />
      <Console />
          
      <main>
        <section id="gbaSection">
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
            <span style={{ color: '#fafafa', fontWeight: 'bold', margin: '10px 0' }}>Lista de Jogos GBA - {filteredGames.length}</span>
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
