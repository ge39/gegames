import styles from '../styles/Carousel.module.css';
import Image from 'next/image';

export default function GameCard({ game }) {
  return (
    <div className={styles.card}>
      {/* <img src={game.image} alt={game.alt} className={styles.image} /> */}
      <div style={{fontSize:'12px',fontWeight:'bold',padding:'10px',color:'#0000e6'}}>{game.name}</div>
      {game.image ? (
            <Image
              src={game.image}
              alt={game.alt}
              width={250}
              height={200}
              className={styles.gameImage}
            />

          ) : (
            <p className={styles.noImage}>Imagem não disponível</p>
          )}
         
         <small style={{fontSize:'10px'}}>{game.desc}</small>
         <div style={{fontSize:'10px',padding:'10px',color:'#0000e6'}}>Players: {game.players} | Rating: {game.rating}</div>
        <a   href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
            className={styles.playNow}
          >
          Play Now
        </a>
    </div>
  );

}
