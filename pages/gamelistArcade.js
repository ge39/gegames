// pages/gamelistArcade.js
import Link from 'next/link';
import { useState } from 'react';
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

const arcadeGames = [
  { title: "Metal Slug" },
  { title: "Street Fighter II" },
  { title: "Cadillacs and Dinosaurs" },
  { title: "The King of Fighters '98" },
  { title: "Final Fight" },
  // ...adicione os outros jogos aqui
];

export default function GamelistArcade() {
  const [favorites, setFavorites] = useState([]);

  // Carrega favoritos do localStorage ao abrir a página
  useEffect(() => {
    const stored = localStorage.getItem('arcadeFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Adiciona ou remove jogo dos favoritos
  const toggleFavorite = (title) => {
    let updatedFavorites;
    if (favorites.includes(title)) {
      updatedFavorites = favorites.filter((fav) => fav !== title);
    } else {
      updatedFavorites = [...favorites, title];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('arcadeFavorites', JSON.stringify(updatedFavorites));
  };

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

      <main className={styles.container}>
        <h1 className={styles.title}>Melhores Jogos de Arcade</h1>
        <ul className={styles.gameList}>
          {arcadeGames.map((game) => (
            <li key={game.title} className={styles.gameItem}>
              {game.title}
              <button
                className={styles.favoriteButton}
                onClick={() => toggleFavorite(game.title)}
              >
                {favorites.includes(game.title) ? '★' : '☆'}
              </button>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
