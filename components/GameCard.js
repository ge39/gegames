import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarsRating from '@/components/StarsRating';
import styles from '../styles/GameCard.module.css'; // ou seu arquivo CSS

const GameCard = ({ game }) => {
  return (
    <div className={styles.card} style={{ position: 'relative' }}>
        
         {/* Título e descrição */}
          <h6 style={{ color: 'snow',marginTop:'-5px' }}>{game.name}</h6>

      {/* Imagem do jogo */}
      <Image
        src={game.image}
        alt={game.alt || game.name}
        width={200}
        height={200}
        className={styles.gameImage}
        priority={false}
      />

      {/* Nome do jogo */}
      <p style={{ fontSize: '10px', color: 'snow' }}>{game.desc}</p>
      <p style={{ fontSize: '10px', color: 'snow' }}>{game.players} jogadores</p>
       <StarsRating rating={game.rating} />⭐
      {/* Botão */}
      <div style={{ fontSize: '12px' }}>
          <Link href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`} className={styles.playNow}>
            Jogar Agora
          </Link>
      </div>
    </div>
  );
};

export default GameCard;
