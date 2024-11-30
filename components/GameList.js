import React from 'react';
import styles from '../styles/GameList.module.css'; // Usaremos CSS Modules

const GameList = ({ games }) => {
  return (
    <div className={styles.gameContainer}>
      {games.map((game) => (
        <div key={game.id} className={styles.gameCard}>
          <h3>{game.name}</h3>
          <p><strong>Descrição:</strong> {game.desc}</p>
          {/* <p><strong>Players:</strong> {game.players}</p> */}
          {/* <p><strong>Rating:</strong> {game.rating}</p> */}
          <p><strong>Data lançamento:</strong> {game.releasedate}</p>
          <img src={game.image} alt={game.alt} className={styles.gameImage} />
          <a 
            // href={`../../emulation?jogo=${encodeURIComponent(game.path)}`} 
            href={`../../emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}

            className={styles.playButton}
          >
            Play Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default GameList;
