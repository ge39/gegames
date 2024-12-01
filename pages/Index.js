import React from 'react';
import Layout from '../components/Layout';
import GameList from '../components/GameList';

export default function Home() {
  const images = [
    '/logo/arcade.png',
    '/logo/psx.png',
    '/logo/snes.png',
    '/logo/megadrive.png',
    '/logo/n64.png',
    '/logo/gba.png',
    '/logo/atari.png',
  ];

  const gameData = {
    games: [
      {
        id: "37385",
        path: "./1944.zip",
        name: "1944 : THE LOOP MASTER",
        desc: "O jogo se passa nas acaloradas batalhas de 1944, durante a Segunda Guerra Mundial...",
        image: "/images/1944-image.png",
        alt: "1944: The Loop Master Cover Art",
        rating: "0.9",
        players: "1-2",
        releasedate: "2000-06-20",
      },
      {
        id: "42982",
        path: "./sf2.zip",
        name: "STREET FIGHTER II: THE WORLD WARRIOR",
        desc: "Street Fighter II é um clássico jogo de luta competitivo lançado originalmente em 1991.",
        image: "/images/sf2-image.png",
        alt: "Street Fighter II Cover Art",
        rating: "0.85",
        players: "1-2",
        releasedate: "1991-01-01",
      },
      {
        id: "37402",
        path: "./mshvsf.zip",
        name: "MARVEL SUPER HEROES VS. STREET FIGHTER",
        desc: "Escolha seus heróis favoritos dos universos de Street Fighter e Marvel Super Heroes.",
        image: "/images/mshvsf-image.png",
        alt: "Marvel Super Heroes vs Street Fighter Cover Art",
        rating: "0.8",
        players: "1-2",
        releasedate: "1997-01-01",
      },
      {
        id: "37360",
        path: "./dino.zip",
        name: "CADILLACS AND DINOSAURS",
        desc: "Um jogo de beat 'em up clássico lançado em 1993 pela Capcom.",
        image: "/images/dino-image.png",
        alt: "Cadillacs and Dinosaurs Cover Art",
        rating: "0.75",
        players: "1-3",
        releasedate: "1993-01-01",
      },

      {
        id: "37362",
        path: "./ffight.zip",
        name: "FINAL FIGHT",
        desc: " Final Fight possui seis fases, Cada fase tem lugar diferente de Metro City,como as favelas e o metrô, No final de cada fase, o jogador enfrentará um de chefe.",
        image: "/images/ffightae-image.png",
        alt: "FINAL FIGHT",
        rating: "0.75",
        players: "1-2",
        releasedate: "1988-12-31",

      },
    ],
  };

  return (
    <Layout>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center', color: '#333', fontSize: '24px', }}>Consoles</h1>
      <Carousel images={images} />
      <h2 style={{ fontWeight: 'bold', textAlign: 'center', margin: '20px', fontSize: '24px',  }}>Jogos</h2>
      <GameList games={gameData.games} />
    </Layout>
  );
}
