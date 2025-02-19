import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/GamelistArcade.module.css';
import Footer from '../components/Footer';
import Image from 'next/image'; // Importando a tag Image do Next.js

export default function Gamelist() {
  const arcadeGames = [
    {
      id: "sn1",
      path: "snes/Super Mario World.zip",
      name: "Super Mario World",
      core: "snes",
      desc: "Um dos maiores clássicos do Super Nintendo, onde Mario deve salvar a princesa Peach.",
      image: "/images/games/snes/SuperMarioWorld.jpg",
      alt: "Super Mario World Cover Art",
      rating: "1.0",
      players: "1-2",
      releasedate: "1990-11-21",
    },
    {
      id: "sn2",
      path: "snes/zelda-link.zip",
      core: "snes",
      name: "The Legend of Zelda: A Link to the Past",
      desc: "A épica aventura de Link em busca de salvar Hyrule da escuridão de Ganon.",
      image: "/images/games/snes/Legend of Zelda, The - A Link to the Past (U) [T+Por]-thumb.png",
      alt: "The Legend of Zelda Cover Art",
      rating: "0.95",
      players: "1",
      releasedate: "1991-11-21",
    },
    {
      id: "sn3",
      path: "snes/Donkey Kong Country (USA).zip",
      core: "snes",
      name: "Donkey Kong Country",
      desc: "A icônica aventura de Donkey Kong e Diddy para recuperar as bananas roubadas pelo Kremling Krew.",
      image: "/images/games/snes/Donkey Kong Country (USA)-thumb.png",
      alt: "Donkey Kong Country Cover Art",
      rating: "0.9",
      players: "1-2",
      releasedate: "1994-11-21",
    },
    {
      id: "sn4",
      path: "snes/Top Gear (USA).zip",
      core: "snes",
      name: "Top Gear",
      desc: "Top Gear é um jogo de corrida no qual você compete contra adversários em pistas desafiadoras.",
      image: "/images/games/snes/Top Gear (USA)-thumb.png",
      alt: "Top Gear Cover Art",
      rating: "0.85",
      players: "1-2",
      releasedate: "1992-11-22",
      },
      {
        id: "sn5",
        path: "snes/Super Mario Kart (USA).zip",
        core: "snes",
        name: "Super Mario Kart",
        desc: "O icônico jogo de kart da Nintendo, com os personagens do Mario competindo em pistas divertidas.",
        image: "/images/games/snes/Super Mario Kart (USA)-thumb.png",
        alt: "Super Mario Kart Cover Art",
        rating: "1.0",
        players: "1-2",
        releasedate: "1992-08-27",
      },
      {
        id: "sn6",
        path: "snes/Star Fox (U) (V1.0) [T+Por].zip",
        core: "snes",
        name: "Star Fox",
        desc: "Star Fox é um jogo de tiro em 3D onde você controla a nave Arwing, enfrentando inimigos em uma série de planetas.",
        image: "/images/games/snes/Star Fox (USA)-thumb.png",
        alt: "Star Fox Cover Art",
        rating: "0.9",
        players: "1",
        releasedate: "1993-02-21",
      },
      {
        id: "sn7",
        path: "snes/Super Metroid (Europe) (En,Fr,De).zip",
        core: "snes",
        name: "Super Metroid",
        desc: "Super Metroid é um jogo de ação e exploração onde Samus Aran tenta resgatar a criatura Metroid seqüestrada.",
        image: "/images/games/snes/Super Metroid (Europe) (En,Fr,De)-thumb.png",
        alt: "Super Metroid Cover Art",
        rating: "0.95",
        players: "1",
        releasedate: "1994-03-19",
      },
             
    ]; // Copie os jogos do seu JSON aqui

  return (
    <>
      <Head>
        <title>Lista de Jogos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main>
        <section id="arcadeSection">
          <h2 style={{textAlign:'center'}}>Super Nintendo</h2>
          <div className={styles.gamesGrid}>
            {arcadeGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <a href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}>
                  <Image
                    src={game.image}
                    alt={game.alt}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                  <h5>{game.name}</h5>
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














































