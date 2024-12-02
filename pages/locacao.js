"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Locacao.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Locacao() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Locação de Fliperamas | Fliperama Retrô</title>
        <meta
          name="description"
          content="Alugue fliperamas retrô para festas e eventos inesquecíveis. Diversão garantida para todas as idades!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Inclusão da Navbar */}
      <Navbar />

      <header className={styles.header}>
        <h1>Locação de Fliperamas</h1>
        <p>Leve a magia dos anos 80 e 90 para o seu evento!</p>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <div className={styles.text}>
            <h2>Transforme Sua Festa em uma Viagem no Tempo</h2>
            <p>
              Nossos fliperamas retrô trazem diversão, nostalgia e muita emoção. Perfeito para aniversários, casamentos,
              eventos corporativos e muito mais!
            </p>
            <button className={styles.cta}>
              <Link href="/orcamento">Peça um Orçamento</Link>
            </button>
          </div>
          <div className={styles.image}>
            <Image
              src="/images/eventos/fliperama_destaque.png"
              alt="Fliperama em evento"
              width={200}
              height={150}
              priority
            />
          </div>
        </section>

        <section className={styles.features}>
          <h2>Por Que Escolher Nossos Fliperamas?</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <Image
                src="/images/eventos/SuperMarioWorld.jpg"
                alt="Máquina de fliperama"
                width={300}
                height={200}
              />
              <h3>Jogos Clássicos</h3>
              <p>Pac-Man, Space Invaders, Street Fighter e muitos outros.</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/images/eventos/fliperama_destaque.png"
                alt="Fliperama com decoração temática"
                width={300}
                height={200}
              />
              <h3>Decoração Temática</h3>
              <p>
                Fliperamas com design vibrante para complementar sua festa.
              </p>
            </div>
            <div className={styles.card}>
              <Image
                src="/images/eventos/evento1_2023.jpeg"  // Caminho corrigido
                alt="Família jogando fliperama"
                width={300}
                height={200}
              />
              <h3>Entretenimento Garantido</h3>
              <p>Adultos, crianças e adolescentes se divertem juntos!</p>
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <h2>Galeria de Eventos</h2>
          <p>Veja nossos fliperamas em ação nos melhores eventos:</p>
          <div className={styles.media}>
            <Image
               src="/images/eventos/evento1_2023.jpeg"  // Caminho corrigido
              alt="Evento com fliperamas"
              width={400}
              height={300}
            />
            <Image
              src="/images/eventos/galera_evento.jpg"
              alt="Festa temática com fliperama"
              width={400}
              height={300}
            />
            <video
              className={styles.video}
              controls
              src="../videos/anuncio_fliperama.mp4"
              alt="Vídeo de evento com fliperamas"
            />
          </div>
        </section>

        <section className={styles.contact}>
          <h2>Entre em Contato</h2>
          <p>Garanta diversão retrô no seu evento. Solicite um orçamento agora mesmo!</p>
          <button className={styles.cta}>
            <Link href="/orcamento">Solicitar Orçamento</Link>
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
