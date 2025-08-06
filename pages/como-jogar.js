import Head from "next/head";
import { useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Console from '@/components/Console';
import styles from "../styles/ComoJogar.module.css";
import Image from 'next/image';
import Link from "next/link";

export default function ComoJogar() {
  const playSound = useCallback(() => {
    const audio = new Audio("/sounds/coin.wav");
    audio.volume = 0.3;
    audio.play();
  }, []);

  return (
    <>
      <Head>
        <title>Como Jogar | Gegames</title>
        <meta
          name="description"
          content="Sinta a nostalgia e jogue os clássicos que marcaram gerações no Gegames. Veja como começar!"
        />
      </Head>

      <Navbar />
         <div style={{bacgroundColor:"#333"}}>
           <Console />
        </div>
      
            
      <main className={styles.container}>
        <h1 className={styles.title}>🚀 Prepare-se para a Nostalgia!</h1>
            
        <p className={styles.intro}>
          Se você sente saudades de soprar cartuchos, ouvir o som do Sega&nbsp;
          &quot;SEEGAA&quot;, ou quer reviver os dias de glória do Super Mario,
          ou disputar partidas épicas de Street Fighter com os amigos,
          você está no lugar certo. No <strong>Gegames</strong>, os clássicos
          estão de volta — direto no seu navegador!
        </p>

        <div className={styles.audioPlayer}>
          <button onClick={() => new Audio('/sounds/sega-hd.mp3').play()}>
            🔊 Ouvir som retrô
          </button>
        </div>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>🎮 Passo 1: Escolha seu jogo favorito</h2>
          <p>
            Acesse a <Link href="/jogos-online-retro" className={styles.link}>página dos Games</Link> e explore nossa coleção de clássicos — do Atari ao Super Nintendo.
            Ao encontrar aquele jogo que fez parte da sua infância, clique e... pronto! É só apertar o Play Now e você sentirá a nostalgia.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>🕹️ Passo 2: Domine os controles</h2>
          <p>Os jogos usam o teclado do seu PC. Veja os comandos padrão:</p>
          <ul className={styles.list}>
            <li><strong>Setas:</strong> Direcional</li>
            <li><strong>Z:</strong> Botão A</li>
            <li><strong>X:</strong> Botão B</li>
            <li><strong>Enter:</strong> Start</li>
            <li><strong>Shift:</strong> Select</li>
          </ul>
          <p>Dica: conecte um controle USB e a nostalgia será ainda mais real!</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>👾 Passo 3: Jogue online com um amigo usando netplay</h2>
          <p>
            Para reviver a emoção dos jogos retrô com um amigo, use o sistema de <strong>netplay</strong> do Gegames:
          </p>
          <ul className={styles.list}>
            <li><strong>Crie uma sala exclusiva:</strong> ao iniciar um jogo multiplayer, gere um nome sugestivo e único para sua sala.</li>
            <li><strong>Compartilhe o nome do jogo e o ID da sala:</strong> envie o nome do jogo e o nome da sala para seu amigo para que ele entre na mesma sala.</li>
            <li><strong>Joguem sincronizados:</strong> vocês estarão conectados em tempo real, como se estivessem no mesmo lugar.</li>
            <li><strong>Comunicação via webcam:</strong> ativem as webcams para se ver, conversem por áudio e troquem mensagens de texto pelo chat integrado durante a partida.</li>
          </ul>
          <p>
            Assim, o Gegames oferece não só o jogo, mas toda a interação social que marcou os clássicos, agora online e ao alcance de um clique!
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>🔥 Passo 4: Dicas para a melhor experiência</h2>
          <ul className={styles.list}>
            <li>Use o navegador Chrome ou Firefox para melhor desempenho</li>
            <li>Ative o modo tela cheia para imersão total (F11)</li>
            <li>Feche outras abas para evitar travamentos</li>
            <li>Jogue com fone de ouvido — os sons clássicos são puro ouro retrô!</li>
            <li>Dúvidas ou dificuldades — envie uma mensagem via WhatsApp!</li>
          </ul>
        </section>

        <section className={styles.sectionFinal}>
          <h2 className={styles.subtitle}>✨ Agora é com você!</h2>
          <p>
            Seu controle está na mão, a nostalgia está no ar... clique, jogue e reviva os melhores momentos da sua infância — agora online, com estilo, com Gegames!
          </p>
          <Link href="/jogos-online-retro" className={styles.botao} onClick={playSound}>
            Comece a Jogar Agora
          </Link>
        </section>

        <Link
          href="https://wa.me/5511975145360?text=Olá!%20Acessei%20o%20site%20Gegames%20e%20quero%20jogar%20ou%20tirar%20uma%20dúvida!"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
          onClick={playSound}
        >
          💬 Fale conosco no WhatsApp
        </Link>

    

        <div className={styles.spriteContainer}>
          <Image src="/sprites/superMetroid.gif" alt="Metroid correndo" width={100} height={100} />
          <Image src="/sprites/mario-running.gif" alt="Mario correndo" width={100} height={100} />
          <Image src="/sprites/sonic-running.gif" alt="Sonic correndo" width={70} height={70} />
           {/* <Image src="/sprites/mario-luigi.gif" alt="Mario-Luigi" width={100} height={100} /> */}
        </div>
        
      </main>
      <Footer />
    </>
  );
}
