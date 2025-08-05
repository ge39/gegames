import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarsRating from '@/components/StarsRating';
import styles from '../styles/GameCard.module.css'; // ou seu arquivo CSS

const GameCard = ({ game }) => {
  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      {/* Nota no canto */}
       <div>
         <StarsRating rating={game.rating} />⭐
       </div>

      {/* Imagem do jogo */}
      <Image
        src={game.image}
        alt={game.alt || game.name}
        width={300}
        height={200}
        className={styles.gameImage}
        priority={false}
      />

      {/* Título e descrição */}
      <h3 style={{ marginTop: '10px' }}>{game.name}</h3>
      <p style={{ fontSize: '14px', color: '#333' }}>{game.desc}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>{game.players} jogadores</p>

      {/* Botão */}
      <Link href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`} className={styles.playNow}>
        🎮 Jogar Agora
      </Link>
    </div>
  );
};

export default GameCard;
