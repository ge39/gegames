import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/GamelistArcade.module.css';
import  '../styles/Globals.css';
import Footer from '../components/Footer';
import Image from 'next/image'; // Importando a tag Image do Next.js
import { useState } from 'react';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const atariGames = [
    {
      id: "1",
      name: "Enduro",
      path: "atari/Enduro(USA).a26",
      core: "atari2600",
      desc: "Enduro é um jogo de corrida onde você tem que competir contra outros carros em um cenário de pista infinita.",
      image: "/images/games/atari/Enduro (USA)-thumb.png",
      rating: "0.85",
      players: "1",
      releasedate: "1983-06-01",
    },
    {
      id: "2",
      name: "River Raid",
      path: "atari/River Raid (USA).a26",
      core: "atari2600",
      desc: "River Raid é um jogo de tiro em que você controla um avião que deve destruir alvos enquanto evita obstáculos no rio.",
      image: "/images/games/atari/River Raid (USA)-thumb.png",
      rating: "0.9",
      players: "1",
      releasedate: "1982-01-01",
    },
    {
      id: "3",
      name: "Megamania",
      path: "atari/MegaMania.a26",
      core: "atari2600",
      desc: "Megamania é um jogo de tiro de atari onde você controla uma nave espacial para destruir inimigos em várias ondas.",
      image: "/images/games/atari/MegaMania - A Space Nightmare (USA)-thumb.png",
      rating: "0.8",
      players: "1",
      releasedate: "1982-01-01",
    },
    {
      id: "4",
      name: "Frostbite",
      path: "atari/Frostbite (USA).a26",
      core: "atari2600",
      desc: "Frostbite é um jogo de ação onde o jogador deve coletar blocos de gelo para construir iglus enquanto evita inimigos.",
      image: "/images/games/atari/Frostbite (USA)-thumb.png",
      rating: "0.75",
      players: "1",
      releasedate: "1983-01-01",
    },
    {
      id: "5",
      name: "Moon Patrol",
      path: "atari/Moon Patrol (USA).a26",
      core: "atari2600",
      desc: "Moon Patrol é um jogo de atari onde o jogador controla um veículo lunar e precisa derrotar inimigos e obstáculos.",
      image: "/images/games/atari/Moon Patrol (USA)-thumb.png",
      rating: "0.9",
      players: "1",
      releasedate: "1982-01-01",
    },
    {
      id: "6",
      name: "Pac-Man",
      path: "atari/Pac-Man (USA).a26",
      core: "atari2600",
      desc: "Pac-Man é um dos jogos mais clássicos da história, onde o jogador controla Pac-Man e deve comer todas as pastilhas enquanto evita os fantasmas.",
      image: "/images/games/atari/Pac-Man (USA)-thumb.png",
      rating: "0.9",
      players: "1",
      releasedate: "1982-05-01",
    },
    {
      id: "7",
      name: "Pitfall!",
      path: ".atari/Pitfall (USA).a26",
      core: "atari2600",
      desc: "Pitfall! é um jogo de aventura onde o jogador controla Harry, um explorador, que deve navegar por uma selva cheia de armadilhas.",
      image: "/images/games/atari/Pitfall (USA)-thumb.png",
      rating: "0.9",
      players: "1",
      releasedate: "1982-10-01",
    },
    {
      id: "8",
      name: "Space Invaders",
      path: "atari/Space Invaders (USA).a26",
      core: "atari2600",
      desc: "Space Invaders é um dos primeiros jogos de tiro em que você controla uma nave para destruir ondas de invasores alienígenas.",
      image: "/images/games/atari/Space Invaders (USA)-thumb.png",
      rating: "1.0",
      players: "1",
      releasedate: "1980-01-01",
    }
             
]; // Copie os jogos do seu JSON aqui
    // Filtra os jogos pelo nome baseado no searchTerm
    const filteredGames = atariGames.filter(game =>
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
          <h2 style={{textAlign:'center', maxwidht:'100%'}}>

          <Link style={{textDecoration: "none" ,color:'red'}} href="/gamelistAtari">Atari - </Link>

          <Link style={{textDecoration: "none" }} href="/lista-de-jogos-arcade-online">Arcade - </Link>
          
          <Link style={{textDecoration: "none" }} href="/lista-de-jogos-snes-online">Super Nintendo - </Link>
       
          <Link style={{textDecoration: "none" }} href="/gamelistMegadrive">Megadrive</Link>

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
          </div>
          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <a href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}>
                  <h5>{game.name}</h5>
                  <Image
                    src={game.image}
                    alt={game.alt}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                  <h5>{"Total Players: " + game.players}</h5>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}














































