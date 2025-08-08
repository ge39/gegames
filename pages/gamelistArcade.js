import GameCard from '../components/GameCard.js';
import styles from '../styles/GamelistArcade.module.css';

export default function GamelistArcade({ games }) {
  // Agrupar os jogos por gênero
  const gamesByGenre = games.reduce((acc, game) => {
    if (!acc[game.genre]) {
      acc[game.genre] = [];
    }
    acc[game.genre].push(game);
    return acc;
  }, {});

  return (
    <div className={styles.arcadeWrapper}>
      {Object.entries(gamesByGenre).map(([genre, gamesInGenre]) => (
        <section key={genre} className={styles.genreSection}>
          <h2 className={styles.genreTitle}>{genre}</h2>

          <div className={styles.carouselContainer}>
            {gamesInGenre.map((game) => (
              <div key={game.id} className={styles.carouselItem}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
