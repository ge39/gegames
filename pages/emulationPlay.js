import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
// import PeerConnection from "../components/PeerConnection";

export default function Emulation() {
  const { query } = useRouter();

  useEffect(() => {
    if (!query.core || !query.jogo) return;

    const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
    const altura = Math.round((largura * 3) / 4 / 2) * 2;

    const checkCanvas = setInterval(() => {
      const gameElement = document.getElementById("game");

      if (gameElement) {
        clearInterval(checkCanvas);

        // Define as opções do EmulatorJS no escopo global
        window.EJS_player = "#game";
        window.EJS_core = query.core;
        window.EJS_multitap = true;
        window.EJS_bios = query.bios || ""; // define como string vazia se não vier bios
        window.EJS_gameUrl = query.jogo.startsWith('http') ? query.jogo : `./roms/${query.jogo}`;
        window.EJS_canvasWidth = largura;
        window.EJS_canvasHeight = altura;
        window.EJS_fullscreenOnLoad = true;

        // Evita carregar o script mais de uma vez
        if (!document.querySelector('script[src="https://www.emulatorjs.com/loader.js"]')) {
          const script = document.createElement("script");
          script.src = "https://www.emulatorjs.com/loader.js";
          script.async = true;
          script.crossOrigin = "anonymous";
          script.onload = () => console.log("EmulatorJS carregado com sucesso.");
          script.onerror = () => console.error("Erro ao carregar o EmulatorJS.");
          document.body.appendChild(script);
        }
      }
    }, 100);

    return () => clearInterval(checkCanvas);
  }, [query]);

  return (
    <div>
      <Navbar />

      <div className={styles.emulatorContainer} style={{
        position: "relative",
        maxWidth: "100vw", // corrigido
        height: '90vh',
        padding: "20px 0",
        margin: "0 auto"
      }}>
        <div
          id="game"
          className={styles.game}
          style={{
            width: "100%",
            height: '100%',
            maxWidth: "100%",
            marginTop: '50px'
          }}
        >
          {/* A área do emulador será criada dentro dessa div */}
        </div>

        {/* Reative a conexão com peerId via URL se desejar */}
        {/* {query.peerId && <PeerConnection peerId={query.peerId} />} */}
      </div>
    </div>
  );
}
