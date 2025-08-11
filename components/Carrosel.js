import { useRef, useEffect, useState, useCallback } from 'react';
import styles from '../styles/Carousel.module.css';
import GameCard from './GameCard';

export default function Carrosel({ games, toggleFavorite }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;

    const item = container.children[index];
    if (!item) return;

    const containerWidth = container.offsetWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;

    // Centraliza exatamente o item
    const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    setCurrentIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < games.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, games.length, scrollToIndex]);

  // Atualiza índice baseado no scroll manual
  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.children.length === 0) return;

    const onScroll = () => {
      const centerPosition = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(container.children).forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - centerPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentIndex(closestIndex);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Suporte às teclas ← e →
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className={styles.carouselWrapper}>
      <button
        className={styles.control}
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Anterior"
      >
        &lt;
      </button>

      <div className={styles.carouselContainer} ref={containerRef}>
        {games.map((game) => (
          <div key={game.id} className={styles.carouselItem}>
            <GameCard 
              game={game} 
              isFavorite={game.isFavorite} 
              toggleFavorite={() => toggleFavorite(game.id)} 
            />
          </div>
        ))}
      </div>

      <button
        className={styles.control}
        onClick={handleNext}
        disabled={currentIndex === games.length - 1}
        aria-label="Próximo"
      >
        &gt;
      </button>
    </div>
  );
}
