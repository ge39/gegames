import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';
import Image from 'next/image';
import { useState } from 'react';
import { atariGames } from '../data/atariGames.js';
import WhatsappButton from '@/components/WhatsappButton'

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGames = atariGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Lista de Jogos Atari</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />

      <main>
        <section id="atariSection">
          <h2 style={{ textAlign: 'center', maxWidth: '100%',marginTop:'80px',borderRadius:'10px'}}>
            <Link style={{ textDecoration: 'none', color: 'red' }} href="/gamelistAtari">Atari - </Link>
            <Link style={{ textDecoration: 'none' }} href="/gamelistArcade">Arcade - </Link>
            <Link style={{textDecoration: "none" }} href="/gamelistGba">Gba - </Link>
            <Link style={{ textDecoration: 'none' }} href="/gamelistSnes">Super Nintendo - </Link>
            <Link style={{ textDecoration: 'none' }} href="/gamelistMegadrive">Megadrive</Link>
          </h2>

          {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '80%',
                maxWidth: '500px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
            < WhatsappButton />
          </div>

          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <Link href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}>
                  <h5>{game.name}</h5>
                  <Image
                    src={game.image}
                    alt={game.name}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                  <h5>{"Total Players: " + game.players}</h5>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
