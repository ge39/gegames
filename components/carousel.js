import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';
import GameCard from './GameCard';

export default function Carousel({ games }) {
  const [index, setIndex] = useState(0); // Índice atual do carrossel
  const [itemsVisible, setItemsVisible] = useState(1); // Número inicial de itens visíveis
  const startTouchX = useRef(0); // Posição inicial do toque
  const isSwiping = useRef(false); // Indica se está arrastando

  // Atualiza o número de itens visíveis com base no tamanho da tela
  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth > 768) {
        setItemsVisible(3); // Exibir 4 itens em telas maiores
      } else {
        setItemsVisible(1); // Exibir 1 itens em telas menores
      }
    };

    // Chamada inicial
    updateItemsVisible();

    // Atualiza ao redimensionar
    window.addEventListener('resize', updateItemsVisible);

    // Cleanup do evento
    return () => {
      window.removeEventListener('resize', updateItemsVisible);
    };
  }, []);

  // Passar para o próximo slide
  const nextSlide = () => {
    if (index < games.length - itemsVisible) {
      setIndex(index + 1);
    }
  };

  // Voltar para o slide anterior
  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Inicia o toque
  const handleTouchStart = (e) => {
    startTouchX.current = e.touches[0].clientX; // Registra o início do toque
    isSwiping.current = true; // Marca que o usuário começou a deslizar
  };

  // Movimenta o carrossel com o toque
  const handleTouchMove = (e) => {
    if (!isSwiping.current) return; // Ignora se não está arrastando

    const touchEndX = e.touches[0].clientX;
    const diff = startTouchX.current - touchEndX;

    if (Math.abs(diff) > 30) { // Limite mínimo para deslizar
      if (diff > 0) {
        nextSlide(); // Vai para o próximo slide
      } else {
        prevSlide(); // Volta para o slide anterior
      }
      isSwiping.current = false; // Evita múltiplos disparos no mesmo movimento
    }
  };

  // Finaliza o toque
  const handleTouchEnd = () => {
    isSwiping.current = false; // Reseta o estado de arrasto
  };

  return (
    <div
      className={styles.carouselContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botão de navegação para o slide anterior */}
      <button
        className={styles.control}
        onClick={prevSlide}
        disabled={index === 0}
      >
        &lt;
      </button>

      {/* Carrossel contendo os slides */}
      <div
        className={styles.carousel}
        style={{
          transform: `translateX(-${index * (100 / itemsVisible)}%)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {games.map((game) => (
          <div key={game.id} className={styles.carouselItem}>
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Botão de navegação para o próximo slide */}
      <button
        className={styles.control}
        onClick={nextSlide}
        disabled={index >= games.length - itemsVisible}
      >
        &gt;
      </button>
    </div>
  );
}
