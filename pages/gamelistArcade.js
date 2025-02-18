import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Globals.css';
import Footer from '../components/Footer';
// import Link from 'next/link';  // Importando a tag Link do Next.js
import Image from 'next/image'; // Importando a tag Image do Next.js

export default function Gamelist() {
  const arcadeGames = [
    {
      id: "37385",
      path: "arcade/1944.zip",
      core: "fbalpha2012_cps2",
      bios:"",
      name: "1944 : THE LOOP MASTER",
      desc: "O jogo se passa nas acaloradas batalhas de 1944, durante a Segunda Guerra Mundial...",
      image: "/images/games/1944-image.png",
      alt: "1944: The Loop Master Cover Art",
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
      image: "/images/games/captcomm-image.png",
      alt: "Captain Commando",
      players: "1-2",
      releasedate: "1991-01-01",
    },
  ]; // Copie os jogos do seu JSON aqui
  return (
    <>
      <Head>
        <title>Lista de Jogos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <section id="arcadeSection">
          <a href="#">
            <h2>Arcade</h2>
          </a>
          <div className={styles.gamesGrid} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
            textAlign: 'center'
          }}>
            {arcadeGames.map((game) => (
              <div key={game.id} className={styles.gameCard} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <a href={game.path} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={game.image}
                    alt={game.alt}
                    className={styles.gameImage}
                    width={300}   // Largura da imagem
                    height={200}  // Altura da imagem (ajuste conforme necessário)
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      maxWidth: '300px', // Controla o tamanho máximo
                      margin: '0 auto'
                    }}
                  />
                  <h5>{game.name}</h5>
                </a>
                <a  
                  style={{
                    marginTop: '10px',
                    padding: '10px 15px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}
                  className={styles.playNow}
                >
                  Play Now
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
