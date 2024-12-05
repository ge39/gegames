import { useState } from 'react';
import styles from '../styles/Carousel.module.css';
import GameCard from './GameCard';

export default function Carousel({ games }) {
  const [index, setIndex] = useState(0);
  const itemsVisible = 2; // Número de itens visíveis no carrossel (20% de largura)

  // Função para passar para o próximo slide
  const nextSlide = () => {
    if (index < games.length - itemsVisible) {
      setIndex(index + 4);
    }
  };

  // Função para voltar para o slide anterior
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 4);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Botão de navegação para o slide anterior */}
      <button
        className={styles.control}
        onClick={prevSlide}
        disabled={index === 0} // Desabilita quando está no primeiro slide
      >
        &lt;
      </button>

      {/* Carrossel contendo os slides */}
      <div
        className={styles.carousel}
        style={{
          transform: `translateX(-${(index / games.length) * 100}%)`, // Ajuste para o número de itens visíveis
          transition: 'transform 0.3s ease-in-out', // Transição suave
        }}
      >
        {games.map((game, i) => (
          <div
            key={game.id}
            className={`${styles.carouselItem} ${i === index ? styles.active : ''}`}
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Botão de navegação para o próximo slide */}
      <button
        className={styles.control}
        onClick={nextSlide}
        disabled={index >= games.length - itemsVisible} // Desabilita quando está no último slide
      >
        &gt;
      </button>
    </div>
  );
}
