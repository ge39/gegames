import React from 'react';
import Image from 'next/image';
import styles from '../styles/GameList.module.css'; // Usaremos CSS Modules

const GameList = ({ games }) => {
  if (!games || games.length === 0) {
    return <p className={styles.noGames}>Nenhum jogo disponível no momento.</p>;
  }

  return (
    <div className={styles.gameContainer}>
      {games.map((game) => (
        <div key={game.id} className={styles.gameCard}>
          <h3>{game.name}</h3>
          <p>
            <strong>Descrição:</strong> {game.desc || 'Descrição não disponível'}
          </p>
          {/* <p><strong>Players:</strong> {game.players}</p> */}
          {/* <p><strong>Rating:</strong> {game.rating}</p> */}
          <p>
            <strong>Data lançamento:</strong> {game.releasedate || 'Não informado'}
          </p>
          {game.image ? (
            <Image
              src={game.image}
              alt={game.alt || `Imagem de ${game.name}`}
              width={300} // Defina o tamanho da imagem
              height={200}
              className={styles.gameImage}
            />
          ) : (
            <p className={styles.noImage}>Imagem não disponível</p>
          )}
          <a
            href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
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