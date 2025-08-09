// components/GameCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarsRating from '@/components/StarsRating';
import styles from '../styles/GameCard.module.css';

const GameCard = ({ game, isFavorite, toggleFavorite }) => {
  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <h6 style={{ color: 'snow', marginTop: '-5px' }}>{game.name}</h6>
      <Image
        src={game.image}
        alt={game.alt || game.name}
        width={200}
        height={200}
        className={styles.gameImage}
        priority={false}
      />
      <p style={{ fontSize: '10px', color: 'snow' }}>{game.desc}</p>
      <p style={{ fontSize: '10px', color: 'snow' }}>{game.players} jogadores</p>
      <p style={{ fontSize: '10px', color: 'snow' }}>{game.genre}</p>
      <StarsRating rating={game.rating} />⭐

      <div style={{ fontSize: '12px' }}>
        <Link
          href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
          className={styles.playNow}
        >
          Jogar Agora
        </Link>
      </div>

      {/* Botão favorito */}
      {typeof isFavorite === 'boolean' && toggleFavorite && (
        <button
          onClick={() => toggleFavorite(game.id)}
          aria-label={isFavorite ? `Remover ${game.name} dos favoritos` : `Adicionar ${game.name} aos favoritos`}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: isFavorite ? '#e63946' : '#fff',
            textShadow: '0 0 5px black',
          }}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite ? '💔' : '❤️'}
        </button>
      )}
    </div>
  );
};

export default GameCard;
