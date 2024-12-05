import styles from '../styles/Carousel.module.css';

export default function GameCard({ game }) {
  return (
    <div className={styles.card}>
      <img src={game.image} alt={game.alt} className={styles.image} />
      <h3>{game.name}</h3>
      <p>{game.desc}</p>
      <small>Players: {game.players} | Rating: {game.rating}</small>
      <a className={styles.playNow} href={game.path} target="_blank" rel="noopener noreferrer">
        Play Now
      </a>
    </div>
  );
}
