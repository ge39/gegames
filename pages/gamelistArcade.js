// pages/gamelistArcade.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/GamelistArcade.module.css';

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
      <Head>
        <title>Gamelist Arcade - Jogos Anos 90 e 2000</title>
      </Head>

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
