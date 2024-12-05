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
              width={250} // Defina o tamanho da imagem
              height={200}
              className={styles.Image}
            />
          ) : (
            <p className={styles.noImage}>Imagem não disponível</p>
          )}
      <h3>{game.name}</h3>
      <p>{game.desc}</p>
      <small>Players: {game.players} | Rating: {game.rating}</small>
        <a   href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
            className={styles.playNow}
          >
          Play Now
        </a>
    </div>
  );
}
