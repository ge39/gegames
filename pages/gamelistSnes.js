import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import Navbar from '../components/Navbar.js';
import styles from '../styles/GamelistArcade.module.css';
import  '../styles/Globals.css';
import Footer from '../components/Footer.js';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useState } from 'react';
import { snesGames } from '../data/snesGames.js';
import WhatsappButton from '@/components/WhatsappButton';
import Console from '@/components/Console.js';
import PeerConnection from "../components/PeerConnection";
import SEOHead from "@/components/SEOHead";

export default function Gamelist() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const { query } = useRouter(); // 👈 isso corrige o erro
    // Filtra os jogos pelo nome baseado no searchTerm
    const filteredGames = snesGames.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
     <SEOHead
        title="Jogos SNES Online | GeGames"
        description="Reviva os clássicos do Super Nintendo! Jogue online títulos como Super Mario, Donkey Kong, Zelda e outros diretamente do seu navegador."
        keywords="snes, super nintendo, jogos snes online, retro games, mario, donkey kong, zelda, jogos antigos, gegames"
        image="https://gegames.vercel.app/images/capa-snes.png"
        url="https://gegames.vercel.app/gamelistSnes"
      />

      {/* conteúdo da página */}
    </>
      <Navbar />

      <main>
        <section id="snesSection">
          < Console />
          <PeerConnection peerId={query.peerId} />

          {/* Campo de busca */}
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <h4 style={{backgroundColor:'transparent',color:'#fafafa',borderRadius:'10px',padding:'10px'}}>Lista de Jogos Super Nintendo - {filteredGames.length}</h4>
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














































