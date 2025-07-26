import styles from '../styles/Carousel.module.css';
import Image from 'next/image';

export default function GameCard({ game }) {
  return (
    <div className={styles.card}>
      {/* <img src={game.image} alt={game.alt} className={styles.image} /> */}

      {game.image ? (
            <Image
              src={game.image}
              alt={game.alt || `Imagem de ${game.name}`}
              width={200} // Defina o tamanho da imagem
              height={200}
              className={styles.Image}
            />
          ) : (
            <p className={styles.noImage}>Imagem não disponível</p>
          )}
         <div style={{fontSize:'12px',fontWeight:'bold',marginTop:'10px'}}>{game.name}</div>
         {/* <small style={{fontSize:'10px'}}>{game.desc}</small> */}
         <div style={{fontSize:'10px'}}>Players: {game.players} | Rating: {game.rating}</div>
        <a   href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
            className={styles.playNow}
          >
          Play Now
        </a>
    </div>
  );
}
