'use client'; // Isso marca o componente para ser executado no cliente

import { useEffect } from 'react';
import styles from '../styles/TopJogos.module.css';
import Image from 'next/image';

const TopJogos = () => {
  // Agora você pode usar useEffect normalmente
  useEffect(() => {
    console.log('Componente carregado no cliente!');
  }, []);

  return (
    <section id="top-jogos" className={styles.jogosSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>Esta é uma pequena amostra de mais de Mil Jogos Clássicos que Acompanham Nossos Fliperamas!</h2>
          <p>Reviva momentos inesquecíveis com os melhores jogos de Fliperamas, SNES, Mega Drive e Game Boy!</p>
        </header>

        <div className={styles.jogosLista} id="jogos-lista">
          {/* Fliperamas */}
          <div className={styles.console}>
            <h3>Fliperamas</h3>
            <ul>
              <li>
                <div className={styles.jogoInfo}>
                  <div className={styles.imagemJogo}>
                    <Image 
                      src="../public/images/games/arcade/sf2-image.png" 
                      alt="Street Fighter II" 
                      width={300} 
                      height={200} 
                    />
                  </div>
                </div>
                <span><a href="https://www.google.com.br" target="_blank">Street Fighter II</a></span>
              </li>
              {/* Outros jogos */}
            </ul>
          </div>
          {/* Outras seções como SNES, Mega Drive */}
        </div>
        <a href="#top" className={styles.topButton}>Voltar ao Topo</a>
      </div>
    </section>
  );
};

export default TopJogos;
