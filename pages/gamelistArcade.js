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
import StarsRating from '@/components/StarsRating';
// import ArcadeFilter from '@/components/ArcadeFilter';
import '../styles/Globals.css';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Carrega favoritos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('arcadeFavorites');
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
    localStorage.setItem('arcadeFavorites', JSON.stringify(updated));
  };

  // Verifica se um jogo é favorito
  const isFavorite = (id) => favorites.includes(id);

  // Filtra os jogos por nome e favoritos (se ativado)
  const filteredGames = arcadeGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFav = isFavorite(game.id);
    return matchesSearch && (!showOnlyFavorites || isFav);
  });

 

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
           <Console />
        <section id="arcadeSection">    
          {/* Barra de busca e favoritos */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
              <div style={{ textAlign: 'center', margin: '20px' }}>
                <div>
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
                </div>
                    {/* <ArcadeFilter />  Busca por genero e data */}
              
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
              <span style={{ color: '#fafafa', fontWeight: 'bold', margin: '10px 0' }}>Lista de Jogos Arcade - {filteredGames.length}</span>
            </div>
             

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
                   
                </Link>
                     <h5>
                      {game.desc}
                      <br />
                      {game.genre}
                      <br />
                      Players: {game.players}
                    </h5>
                    
                    <div style={{ fontSize: '14px', padding: '5px', color: '#ffa500' }}>
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