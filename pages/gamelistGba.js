import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';
import Image from 'next/image';
import { useState } from 'react';
import { gbaGames } from '../data/gbaGames.js';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console.js';
import  PeerConnection from "../components/PeerConnection";

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const { query } = useRouter(); // 👈 isso corrige o erro

  const filteredGames = gbaGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Lista de Jogos GBA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />

      <main>
        <section id="atariSection">
          <Console />
          
           <PeerConnection peerId={query.peerId} />

          {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{backgroundColor:'transparent',color:'#fafafa',borderRadius:'10px',padding:'10px'}}>Lista de Jogos GBA - {filteredGames.length}</h4>
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
            < WhatsappButton/>
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
