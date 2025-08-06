// import { useRef, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';
import GameCard from './GameCard';

export default function Carousel({ games }) {
  const containerRef = useRef(null);

  // Centraliza o item específico
  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.children[0].offsetWidth;
    const scrollPosition = itemWidth * index - (container.offsetWidth - itemWidth) / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  // Swipe por botão
  const handlePrev = () => {
    const container = containerRef.current;
    const itemWidth = container.children[0].offsetWidth;
    const currentIndex = Math.round(container.scrollLeft / itemWidth);
    scrollToIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    const container = containerRef.current;
    const itemWidth = container.children[0].offsetWidth;
    const currentIndex = Math.round(container.scrollLeft / itemWidth);
    scrollToIndex(Math.min(games.length - 1, currentIndex + 1));
  };

  return (
    <div className={styles.carouselWrapper}>
      <button className={styles.control} onClick={handlePrev}>&lt;</button>

      <div
        className={styles.carouselContainer}
        ref={containerRef}
      >
        {games.map((game) => (
          <div key={game.id} className={styles.carouselItem}>
            <GameCard game={game} />
          </div>
        ))}
      </div>

      <button className={styles.control} onClick={handleNext}>&gt;</button>
    </div>
  );
}
