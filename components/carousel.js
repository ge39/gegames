import { useRef, useEffect, useState } from 'react';
import styles from '../styles/Carousel.module.css';
import GameCard from './GameCard';

export default function Carousel({ games }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const item = container.children[index];
    if (!item) return;

    const containerWidth = container.offsetWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;

    const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < games.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  // Swipe manual com dedo ou mouse (opcional: detecta deslize e atualiza o índice)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.children[0]?.offsetWidth || 1;
      const index = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, []);

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
