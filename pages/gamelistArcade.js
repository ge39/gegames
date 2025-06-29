import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar.js';
import styles from '../styles/GamelistArcade.module.css';
import  '../styles/Globals.css';
import Footer from '../components/Footer.js';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useState } from 'react';
import { arcadeGames } from '../data/arcadeGames.js';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console.js';
import PeerConnection from "../components/PeerConnection";

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  
    // Filtra os jogos pelo nome baseado no searchTerm
    const filteredGames = arcadeGames.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
    
      <Head>
        <title>Lista de Jogos Arcade Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main>
        <section id="arcadeSection">
          <Console />
            {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{backgroundColor:'transparent',color:'#fafafa',borderRadius:'10px',padding:'10px'}}>Lista de Jogos Arcade - {filteredGames.length}</h4>
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
            <WhatsappButton />
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
            {/* <AdultGamesSection /> */}
        </section>
      </main>
       <PeerConnection peerId={null} />
      <Footer />
      
    </>
    
  );
}
