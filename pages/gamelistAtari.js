import Link from 'next/link';
import { useRouter } from "next/router";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/GamelistArcade.module.css';
import '../styles/Globals.css';
import Image from 'next/image';
import { useState } from 'react';
import { atariGames } from '../data/atariGames.js';
import WhatsappButton from '@/components/WhatsappButton'
import Console from '@/components/Console.js';
import PeerConnection from "../components/PeerConnection";
import SEOHead from "@/components/SEOHead";

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const { query } = useRouter(); // 👈 isso corrige o erro

  const filteredGames = atariGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <>
      <SEOHead
        title="Jogos Atari 2600 Online | GeGames"
        description="Jogue online os jogos clássicos do Atari 2600! Reviva títulos lendários como Pitfall, River Raid, Enduro, Pac-Man e outros diretamente no seu navegador."
        keywords="atari, atari 2600, jogos atari online, jogos antigos, retro games, river raid, pac-man, pitfall, gegames"
        image="https://gegames.vercel.app/images/capa-atari.png"
        url="https://gegames.vercel.app/gamelistAtari"
      />

      {/* conteúdo da página */}
   
      <Navbar />

      <main>
        <section id="atariSection">
          <Console />
           <PeerConnection peerId={query.peerId} />
           
          {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{backgroundColor:'transparent',color:'#fafafa',borderRadius:'10px',padding:'10px'}}>Lista de Jogos Atari - {filteredGames.length}</h4>
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
        </section>
      </main>
     <Footer />
   </>
  );
}

