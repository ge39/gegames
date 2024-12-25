import Head from 'next/head';
import Carousel from '../components/carousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/Globals.css';


export default function Gamelist() {
  // Dados para os carrosséis
  const arcadeGames = [
    {
      id: "37385",
      path: "arcade/1944.zip",
      core: "arcade",
      bios:"",
      name: "1944 : THE LOOP MASTER",
      desc: "O jogo se passa nas acaloradas batalhas de 1944, durante a Segunda Guerra Mundial...",
      image: "/images/games/1944-image.png",
      alt: "1944: The Loop Master Cover Art",
      rating: "0.9",
      players: "1-2",
      releasedate: "2000-06-20",
    },
    {
      id: "42982",
      path: "arcade/sf2.zip",
      core: "arcade",
      bios:"",
      name: "STREET FIGHTER II: THE WORLD WARRIOR",
      desc: "Street Fighter II é um clássico jogo de luta competitivo lançado originalmente em 1991.",
      image: "/images/games/sf2-image.png",
      alt: "Street Fighter II Cover Art",
      rating: "0.85",
      players: "1-2",
      releasedate: "1991-01-01",
    },
    {
      id: "37402",
      path: "arcade/mshvsf.zip",
      core: "arcade",
      bios:"",
      name: "MARVEL SUPER HEROES VS. STREET FIGHTER",
      desc: "Escolha seus heróis favoritos dos universos de Street Fighter e Marvel Super Heroes.",
      image: "/images/games/mshvsf-image.png",
      alt: "Marvel Super Heroes vs Street Fighter Cover Art",
      rating: "0.8",
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
      image: "/images/games/dino-image.png",
      alt: "Cadillacs and Dinosaurs Cover Art",
      rating: "0.75",
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
      image: "/images/games/ffightae-image.png",
      alt: "Final Fight Cover Art",
      rating: "0.75",
      players: "1-2",
      releasedate: "1988-12-31",
    },
    {
      id: "37364",
      path: "arcade/mk3.zip",
      core: "fbneo",
      bios:"",
      name: "Mortal Kombat 3",
      desc: "Tendo conseguido subjugar o reino da Terra, Shao Kahn toma todas as almas humanas da Terra como suas. Para impedir que o reino de Outworld assimile totalmente o Earthrealm.",
      image: "/images/games/mk3-thumb.png",
      alt: "Mortal kombat3",
      rating: "0.8",
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
      image: "/images/games/mslugx-thumb.png",
      alt: "Metal Slug X",
      rating: "0.85",
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
      image: "/images/games/robocop2.png",
      alt: "Robocop2",
      rating: "0.6",
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
      image: "/images/games/kof99-thumb.png",
      alt: "The Kof 99",
      rating: "0.9",
      players: "1-2",
      releasedate: "1999-01-01",
    },
    {
      id: "37368",
      path: "arcade/captcomm.zip",
      core: "arcade",
      bios:"",
      name: "Captain Commando",
      desc: "O jogador escolhe um dos 4 membros do 'Team Commando': Captain Commando,  Jennet (Mack) ou Hoover (Baby Head). Os Commandos devem combater um exército de super criminosos geneticamente modificados, .",
      image: "/images/games/captcomm-image.png",
      alt: "The Kof 99",
      rating: "0.9",
      players: "1-2",
      releasedate: "1991-01-01",
    },
  ]; // Copie os jogos do seu JSON aqui
  const snesGames = [
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
  ];
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
      desc: "Megamania é um jogo de tiro de arcade onde você controla uma nave espacial para destruir inimigos em várias ondas.",
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
      desc: "Moon Patrol é um jogo de arcade onde o jogador controla um veículo lunar e precisa derrotar inimigos e obstáculos.",
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
  ];
  const megadriveGames = [
    {
      id: "md1",
      path: "megadrive/Sonic the Hedgehog (JUE) [!].zip",
      core: "segaMD",
      name: "Sonic the Hedgehog",
      desc: "Sonic é um jogo de plataforma em que o personagem principal, Sonic, deve derrotar o vilão Dr. Robotnik.",
      image: "/images/games/megadrive/Sonic the Hedgehog (JUE) [!]-thumb.jpg",
      alt: "Sonic the Hedgehog Cover Art",
      rating: "0.9",
      players: "1-2",
      releasedate: "1991-06-23"
  },
  {
      id: "md2",
      path: "megadrive/Streets of Rage (JUE) [!].zip",
      core: "segaMD",
      name: "Streets of Rage",
      desc: "Um jogo de luta side-scrolling onde o jogador deve derrotar gangues criminosas para salvar a cidade.",
      image: "/images/games/megadrive/Streets of Rage (JUE) [!]-thumb.jpg",
      alt: "Streets of Rage Cover Art",
      rating: "0.85",
      players: "1-2",
      releasedate: "1991-08-02"
  },
  {
      id: "md3",
      path: "megadrive/Streets of Rage 2 (U) [T-Port_XMib].zip",
      core: "segaMD",
      name: "Streets of Rage 2",
      desc: "A sequência de Streets of Rage, oferecendo novos personagens, movimentos e uma jogabilidade mais refinada.",
      image: "/images/games/megadrive/Streets of Rage 2 (U) [!]-thumb.jpg",
      alt: "Streets of Rage 2 Cover Art",
      rating: "0.95",
      players: "1-2",
      releasedate: "1992-12-20"
  },
  {
      id: "md4",
      path: "megadrive/Comix Zone (4) [!].zip",
      core: "segaMD",
      name: "Comix Zone",
      desc: "Comix Zone é um jogo de plataforma em que o jogador se move dentro de uma história em quadrinhos, controlando o herói Sketch Turner.",
      image: "/images/games/megadrive/Comix Zone (4) [!]-thumb.jpg",
      alt: "Comix Zone Cover Art",
      rating: "0.85",
      players: "1",
      releasedate: "1995-03-10"
  },
  {
      id: "md5",
      path: "megadrive/Altered Beast (REV 02) (JU) [T-Port_Son_Car].zip",
      core: "segaMD",
      name: "Altered Beast",
      desc: "Um jogo de ação em que o jogador assume o papel de um guerreiro ressuscitado, com o poder de se transformar em diferentes criaturas.",
      image: "/images/games/megadrive/Altered Beast (REV 02) (JU) [!]-thumb.jpg",
      alt: "Altered Beast Cover Art",
      rating: "0.8",
      players: "1-2",
      releasedate: "1988-10-29"
  },
  {
      id: "md6",
      path: "megadrive/Phantasy Star 2 (REV 01) (UE) [T-Port].zip",
      core: "segaMD",
      name: "Phantasy Star II",
      desc: "Phantasy Star II é um RPG clássico com uma narrativa profunda, ambientada em um futuro distante onde os jogadores enfrentam forças ameaçadoras.",
      image: "/images/games/megadrive/Phantasy Star 2 (REV 01) (UE) [T-Port]-thumb.jpg",
      alt: "Phantasy Star II Cover Art",
      rating: "0.9",
      players: "1",
      releasedate: "1989-04-29"
  },
  {
      id: "md7",
      path: "megadrive/Earthworm Jim (U) [!].zip",
      core: "segaMD",
      name: "Earthworm Jim",
      desc: "Earthworm Jim é um jogo de plataforma com um herói incomum, Jim, uma minhoca em um traje espacial, lutando contra vilões em um mundo bizarro.",
      image: "/images/games/megadrive/Earthworm Jim (U) [!]-thumb.jpg",
      alt: "Earthworm Jim Cover Art",
      rating: "0.9",
      players: "1-2",
      releasedate: "1994-03-14"
  },
  {
      id: "md8",
      path: "megadrive/Sonic the Hedgehog 3 (U) [!].zip",
      core: "segaMD",
      name: "Sonic the Hedgehog 3",
      desc: "A sequência de Sonic the Hedgehog, com novos movimentos e a introdução de Tails como parceiro de Sonic para aventuras emocionantes.",
      image: "/images/games/megadrive/Sonic the Hedgehog 3 (U) [!]-thumb.jpg",
      alt: "Sonic the Hedgehog 2 Cover Art",
      rating: "0.95",
      players: "1-2",
      releasedate: "1992-11-21"
  },
  {
      id: "md9",
      path: "megadrive/Columns (REV 00) (JU).zip",
      core: "segaMD",
      name: "Columns",
      desc: "Columns é um jogo de quebra-cabeça baseado em combinações de pedras preciosas, onde o objetivo é fazer linhas de três ou mais pedras da mesma cor.",
      image: "/images/games/megadrive/Columns (REV 00) (JU)-thumb.jpg",
      alt: "Columns Cover Art",
      rating: "0.8",
      players: "1-2",
      releasedate: "1990-06-02"
  },
  {
      id: "md10",
      path: "megadrive/Golden Axe (REV 00) (JU) [T-Port_Son_Car].zip",
      core: "segaMD",
      name: "Golden Axe",
      desc: "Golden Axe é um jogo de luta e aventura em que os jogadores controlam heróis que buscam vingar a morte de seus entes queridos, enfrentando monstros e vilões.",
      image: "/images/games/megadrive/Golden Axe (REV 00) (JU) [!]-thumb.jpg",
      alt: "Golden Axe Cover Art",
      rating: "0.85",
      players: "1-2",
      releasedate: "1989-12-01"
  },
  {
    id: "md11",
    path: "megadrive/Show do Milhao (Brazil).zip",
    core: "segaMD",
    name: "Show do Milhão",
    desc: "Show do Milhão é um jogo de perguntas e respostas baseado no programa de TV, onde o jogador tenta ganhar o prêmio máximo respondendo questões.",
    image: "/images/games/megadrive/Show do Milhao (Brazil)-thumb.jpg",
    alt: "Show do Milhão Cover Art",
    rating: "0.85",
    players: "1",
    releasedate: "2000-11-20"
},
{
    id: "md12",
    path: "megadrive/Show do Milhao Volume 2 (Brazil).zip",
    core: "segaMD",
    name: "Show do Milhão 2",
    desc: "A sequência de Show do Milhão, com mais perguntas, mais desafios e mais emoção, continuando a experiência do programa de TV.",
    image: "/images/games/megadrive/Show do Milhao Volume 2 (Brazil)-thumb.jpg",
    alt: "Show do Milhão 2 Cover Art",
    rating: "0.87",
    players: "1",
    releasedate: "2001-10-10"
}
  ]

  return (
    <>
      <Head>
        <title>Carrossel de Jogos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <section id="arcadeSection">
          <h2>Arcade</h2>
          <Carousel games={arcadeGames} />
        </section>

        <section id="snesSection">
          <h2>Super Nintendo</h2>
          <Carousel games={snesGames} />
        </section>

        <section id="atariSection">
          <h2>Atari</h2>
          <Carousel games={atariGames} />
        </section>

        <section id="megadriveSection">
          <h2>Megadrive</h2>
          <Carousel games={megadriveGames} />
        </section>
      </main>
      < Footer />
    </>
  );
}
