import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Emulation.module.css";
import Navbar from "../components/Navbar";

export default function Emulation() {
  const { query } = useRouter();

  useEffect(() => {
    if (!query.jogo || typeof window === "undefined") return;

    // Lista de cores compatíveis
    const arcadeCores = ["arcade", "fbneo", "mame2003", "mame2003-plus", "mame0.243", "mame2010"];

    // Verifica se o core foi definido e se é compatível
    const selectedCore = arcadeCores.includes(query.core) ? query.core : arcadeCores[0];

    // Ajuste de resolução 4:3 (mantendo valores pares)
    const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
    const altura = Math.round((largura * 3) / 4 / 2) * 2;

    // Verifica se a div do jogo já está carregada
    if (!document.getElementById("game")) {
      console.warn("Elemento #game ainda não disponível, adiando configuração.");
      return;
    }

    // Configuração do EmulatorJS
    Object.assign(window, {
      EJS_player: "#game",
      EJS_core: selectedCore,
      EJS_multitap: true, // Ativa suporte para multitap
      EJS_players: 4, // Define até 4 jogadores
      EJS_gameName: query.jogo,
      EJS_gameUrl: `${window.location.origin}/roms/${query.jogo}`,
      EJS_canvasWidth: largura,
      EJS_canvasHeight: altura,
      EJS_fullscreenOnLoad: true,
    });

    console.log("Emulador configurado | Core:", selectedCore, "| Resolução:", largura, "x", altura);

    // Carrega o script do EmulatorJS se ainda não foi carregado
    if (!document.querySelector('script[src="https://www.emulatorjs.com/loader.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => console.log("EmulatorJS carregado!");
      script.onerror = () => alert("Erro ao carregar o emulador.");
      document.body.appendChild(script);
    }
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className={styles.emulatorContainer} style={{ width: "800px", height: "500px", maxWidth: "100%", margin: "0 auto" }}>
        <div id="game" className={styles.game} style={{ width: "800px", height: "500px", maxWidth: "100%" }}></div>
      </div>
    </div>
  );
}
