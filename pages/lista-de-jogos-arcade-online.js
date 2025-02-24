import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/GamelistArcade.module.css';
import  '../styles/Globals.css';
import Footer from '../components/Footer';
import Image from 'next/image'; // Importando a tag Image do Next.js

export default function Gamelist() {
  const arcadeGames = [
    {
      id: "37385",
      path: "arcade/1944.zip",
      core: "arcade",
      bios:"",
      name: "1944 : THE LOOP MASTER",
      desc: "O jogo se passa nas acaloradas batalhas de 1944, durante a Segunda Guerra Mundial...",
      image: "/images/games/arcade/1944-image.webp",
      alt: "1944: The Loop Master Cover Art",
      players: "1-2",
      releasedate: "2000-06-20",
    },
    {
      id: "42982",
      path: "arcade/sf2.zip",
      core: "arcade",
      bios:"",
      name: "STREET F. II: THE WORLD WARRIOR",
      desc: "Street Fighter II é um clássico jogo de luta competitivo lançado originalmente em 1991.",
      image: "/images/games/arcade/sf2-image.webp",
      alt: "Street Fighter II Cover Art",
      players: "1-2",
      releasedate: "1991-01-01",
    },
    {
      id: "37402",
      path: "arcade/mshvsf.zip",
      core: "arcade",
      bios:"",
      name: "MARVEL SUPER HEROES VS. STREET",
      desc: "Escolha seus heróis favoritos dos universos de Street Fighter e Marvel Super Heroes.",
      image: "/images/games/arcade/mshvsf-image.webp",
      alt: "Marvel Super Heroes vs Street Fighter Cover Art",
      players: "1-2",
      releasedate: "1997-01-01",
    },
    {
      id: "37360",
      path: "arcade/dino.zip",
      core: "arcade",
      bios:"",
      name: "CADILLACS AND DINOSAURS",
      desc: "Um jogo de beat 'em up clássico lançado em 1993 pela Capcom.",
      image: "/images/games/arcade/dino-image.webp",
      alt: "Cadillacs and Dinosaurs Cover Art",
      players: "1-3",
      releasedate: "1993-01-01",
    },
    {
      id: "37362",
      path: "arcade/ffight.zip",
      core: "arcade",
      bios:"",
      name: "FINAL FIGHT",
      desc: "Final Fight possui seis fases, cada uma em lugares diferentes de Metro City.",
      image: "/images/games/arcade/ffightae-image.webp",
      alt: "Final Fight Cover Art",
      players: "1-2",
      releasedate: "1988-12-31",
    },
    {
      id: "37364",
      path: "arcade/mk3.zip",
      core: "arcade",
      bios:"",
      name: "Mortal Kombat 3",
      desc: "Tendo conseguido subjugar o reino da Terra, Shao Kahn toma todas as almas humanas da Terra como suas. Para impedir que o reino de Outworld assimile totalmente o Earthrealm.",
      image: "/images/games/arcade/mk3-thumb.webp",
      alt: "Mortal kombat3",
      players: "1-2",
      releasedate: "1995-04-01",
    },
    {
      id: "37365",
      path: "arcade/mslugx.zip",
      core: "arcade",
      bios:"",
      name: "Metal Slug X",
      desc: "Metal Slug X é uma versão alternativa do Metal Slug 2. Diferente do primeiro jogo da franquia, Metal Slug X permite que você escolha os personagens Marco, Tarma, Eri e Fio.",
      image: "/images/games/arcade/mslugx-thumb.webp",
      alt: "Metal Slug X",
      players: "1-2",
      releasedate: "1999-01-01",
    },
    {
      id: "37366",
      path: "arcade/robocop2.zip",
      core: "arcade",
      bios:"",
      name: "Robocop 2",
      desc: "RoboCop 2 é um jogo de tiro em 2D com jogabilidade 2.5D que coloca os jogadores no lugar do RoboCop. O jogo é baseado no filme de mesmo nome e segue sua trama.",
      image: "/images/games/arcade/robocop2.webp",
      alt: "Robocop2",
      players: "1-2",
      releasedate: "1991-01-01",
    },
    {
      id: "37367",
      path: "arcade/kof99.zip",
      core: "arcade",
      bios:"",
      name: "The king of Fighter 99",
      desc: "Chegamos mais uma vez ao tempo para o famoso KOF Tournament! Novos rostos e velhos se juntam para participar do último torneio KOF, mas algo parece errado.",
      image: "/images/games/arcade/kof99.webp",
      alt: "The Kof 99",
      players: "1-2",
      releasedate: "1999-01-01",
    },
    {
      id: "37368",
      path: "arcade/captcomm.zip",
      core: "arcade",
      bios:"",
      name: "Captain Commando",
      desc: "O jogador escolhe um dos 4 membros do 'Team Commando': Captain Commando,  Jennet (Mack) ou Hoover (Baby Head). Os Commandos devem combater um exército de super criminosos geneticamente modificados.",
      image: "/images/games/arcade/captcomm-image.webp",
      alt: "Captain Commando",
      players: "1-2",
      releasedate: "1991-01-01",
    },
      {
        id: "37410",
        path: "arcade/goldnaxe.zip",
        core: "arcade",
        bios: "",
        name: "Golden Axe",
        desc: "Um clássico jogo de ação e aventura da SEGA onde guerreiros enfrentam forças malignas.",
        image: "/images/games/arcade/goldnaxe.webp",
        alt: "Golden Axe Cover Art",
        players: "1-2",
        releasedate: "1989-06-01"
      },
      {
        "id": "37411",
        "path": "arcade/kof98.zip",
        "core": "arcade",
        "bios": "",
        "name": "The King of Fighters '98",
        "desc": "Um dos jogos mais populares da série KOF, trazendo diversos personagens e jogabilidade refinada.",
        "image": "/images/games/arcade/kof98.webp",
        "alt": "The King of Fighters '98 Cover Art",
        "players": "1-2",
        "releasedate": "1998-07-23"
      },
      {
        "id": "37412",
        "path": "arcade/kof2003.zip",
        "core": "arcade",
        "bios": "",
        "name": "The King of Fighters 2003",
        "desc": "A introdução do sistema de Tag Battle na série KOF, permitindo trocas durante as lutas.",
        "image": "/images/games/arcade/kof2003.webp",
        "alt": "The King of Fighters 2003 Cover Art",
        "players": "1-2",
        "releasedate": "2003-12-12"
      },
      {
        "id": "37413",
        "path": "arcade/pacplus.zip",
        "core": "arcade",
        "bios": "",
        "name": "Pac-Man Plus",
        "desc": "Uma versão aprimorada do Pac-Man clássico, com elementos surpresa e maior dificuldade.",
        "image": "/images/games/arcade/pacplus.webp",
        "alt": "Pac-Man Plus Cover Art",
        "players": "1",
        "releasedate": "1982-01-01"
      },
      {
        "id": "37414",
        "path": "arcade/rambo3.zip",
        "core": "arcade",
        "bios": "",
        "name": "Rambo III",
        "desc": "Baseado no famoso filme, o jogo coloca os jogadores no papel de Rambo em missões intensas.",
        "image": "/images/games/arcade/rambo3.webp",
        "alt": "Rambo III Cover Art",
        "players": "1-2",
        "releasedate": "1989-01-01"
      },
      {
        "id": "37416",
        "path": "arcade/sfa3.zip",
        "core": "arcade",
        "bios": "",
        "name": "Street Fighter Alfa 3",
        "desc": "Uma revolução na franquia, com gráficos aprimorados e novas mecânicas como o Parry.",
        "image": "/images/games/arcade/sfa3.webp",
        "alt": "Street Fighter Alfa III Cover Art",
        "players": "1-2",
        "releasedate": "1997-02-04"
      },
      {
        "id": "37417",
        "path": "arcade/tmnt2.zip",
        "core": "arcade",
        "bios": "",
        "name": "Teenage Mutant Ninja Turtles II",
        "desc": "Os heróis de casco retornam em um jogo beat 'em up recheado de ação e cooperação.",
        "image": "/images/games/arcade/tmnt2.webp",
        "alt": "Teenage Mutant Ninja Turtles II Cover Art",
        "players": "1-4",
        "releasedate": "1991-01-01"
      },
      {
        id: "37418",
        path: "arcade/ganryu.zip",
        core: "fbneo",
        bios: "",
        name: "Ganryu",
        desc: "Jogo de ação e plataforma inspirado na lenda do samurai Miyamoto Musashi.",
        image: "/images/games/arcade/ganryu.webp",
        alt: "Ganryu Cover Art",
        players: "1-2",
        releasedate: "1999-04-16"
      },
      {
        id: "funybuble_001",
        path: "arcade/funybubl.zip",
        core: "fbneo",
        bios: "",
        name: "Funny Bubble",
        desc: "Um jogo de puzzle estilo Bubble Bobble onde os jogadores estouram bolhas para avançar de fase.",
        image: "/images/games/arcade/funybubl.webp",
        alt: "Funny Bubble Cover Art",
        players: "1-2",
       releasedate: "1997-01-01"
      },
      {
        id: "37420",
        path: "arcade/rchase.zip",
        core: "fbneo",
        bios: "",
        name: "Rail Chase",
        desc: "Jogo de tiro sobre trilhos da SEGA, onde os jogadores enfrentam inimigos enquanto fogem em um vagão desgovernado.",
        image: "/images/games/arcade/rchase.webp",
        alt: "Rail Chase Cover Art",
        players: "1-2",
        releasedate: "1991-07-01"
      }
     
         
    ]; // Copie os jogos do seu JSON aqui

  return (
    <>
      <Head>
        <title>Lista de Jogos Arcade Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main>
        <section id="arcadeSection">
          <h2 style={{textAlign:'center'}}>

            <Link style={{textDecoration: "none",color:'red' }} href="/lista-de-jogos-arcade-online">Arcade - </Link>
          
            <Link style={{textDecoration: "none" }} href="/lista-de-jogos-snes-online">Super Nintendo - </Link>
         
            <Link style={{textDecoration: "none" }} href="/gamelistMegadrive">Megadrive</Link>

            <Link style={{textDecoration: "none" }} href="/gamelistAtari"> - Atari</Link>
          
          </h2>
            
          <div className={styles.gamesGrid}>
            {arcadeGames.map((game) => (
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














































