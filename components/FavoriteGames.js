// components/FavoriteGames.js
import { useEffect, useState } from 'react';
import styles from './FavoriteGames.module.css';

export default function FavoriteGames() {
  const [favoritos, setFavoritos] = useState([]);

  // Carrega favoritos salvos
  useEffect(() => {
    const saved = localStorage.getItem('favoritos');
    if (saved) {
      setFavoritos(JSON.parse(saved));
    }
  }, []);

  // Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (jogo) => {
    const existe = favoritos.find(f => f.slug === jogo.slug);
    if (existe) {
      setFavoritos(favoritos.filter(f => f.slug !== jogo.slug));
    } else {
      setFavoritos([...favoritos, jogo]);
    }
  };

  const jogosExemplo = [
    { nome: 'Street Fighter II', slug: 'street-fighter-ii' },
    { nome: 'Super Mario World', slug: 'super-mario-world' },
    { nome: 'Sonic The Hedgehog', slug: 'sonic-the-hedgehog' }
  ];

  return (
    <div className={styles.favoritosContainer}>
      <h2>🎮 Jogos Favoritos</h2>
      <ul>
        {favoritos.map(jogo => (
          <li key={jogo.slug}>{jogo.nome}</li>
        ))}
      </ul>

      <h3>Adicionar/Remover Favoritos:</h3>
      {jogosExemplo.map(jogo => (
        <button key={jogo.slug} onClick={() => toggleFavorito(jogo)}>
          {favoritos.find(f => f.slug === jogo.slug) ? '💔 Remover' : '❤️ Favoritar'} {jogo.nome}
        </button>
      ))}
    </div>
  );
}

