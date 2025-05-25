// pages/emulation.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Emulation.module.css";
import Navbar from "../components/Navbar";
import PeerConnection from "../components/PeerConnection";
import WebcamBox from "../components/WebcamBox";

export default function Emulation() {
  const { query } = useRouter();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Atualiza dimensões do canvas conforme tamanho da janela
  useEffect(() => {
    if (!query.jogo || !query.core) return;

    const updateDimensions = () => {
      const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
      const altura = Math.round((largura * 3) / 4 / 2) * 2; // Proporção 4:3
      setDimensions({ width: largura, height: altura });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [query.jogo, query.core]);

  // Configura variáveis globais do EmulatorJS e injeta o script apenas uma vez
  useEffect(() => {
    if (!query.jogo || !query.core) return;

    const gameElement = document.getElementById("game");
    if (!gameElement) return;

    // Atualiza as variáveis do emulador no objeto global window
    Object.assign(window, {
      EJS_player: "#game",
      EJS_multitap: true,
      EJS_core: query.core,
      EJS_gameUrl: `${window.location.origin}/roms/${query.jogo}`,
      EJS_gameName: query.jogo,
      EJS_canvasHeight: dimensions.height,
      EJS_canvasWidth: dimensions.width,
      EJS_fullscreenOnLoad: true,
      EJS_zIndex: 1,  // Para emulador ficar atrás da webcam
    });

    // Injeta script do EmulatorJS apenas se não existir
    if (!document.querySelector('script[src="https://www.emulatorjs.com/loader.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => console.log("EmulatorJS carregado!");
      script.onerror = () => alert("Erro ao carregar o emulador.");
      document.body.appendChild(script);
    }
  }, [query.jogo, query.core, dimensions]);

  if (!query.jogo || !query.core) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: 20 }}>Carregando emulador...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className={styles.emulatorContainer}
        style={{
          width: dimensions.width,
          height: dimensions.height / 1.7,
          maxWidth: "70%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          id="game"
          className={styles.game}
          style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
        >
          <WebcamBox />
          <PeerConnection peerId={query.peerId} />
        </div>
      </div>
    </>
  );
}
