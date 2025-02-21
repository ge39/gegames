import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';

export default function Emulation() {
  const router = useRouter();
  const { jogo, core } = router.query;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !jogo) return;

    // Configuração do EmulatorJS
    window.EJS_player = "#game";
    window.EJS_core = core || "";
    window.EJS_gameName = jogo || "Jogo Padrão";
    // window.EJS_color = "#333"; // Cor válida
    // window.EJS_background ="#FAFAFA"; //cor valida
    window.EJS_gameUrl = `../../roms/${jogo}`;
    window.EJS_biosUrl = "";
    // window.EJS_fullscreenOnLoad = true; // Inicia em tela cheia automaticamente
    window.EJS_canvasWidth = 1280; // Aumentando a largura
    window.EJS_canvasHeight = 720; // Aumentando a altura

    console.log("Configuração do EmulatorJS aplicada:", window.EJS_gameUrl);

    // Carregar script apenas uma vez
    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        console.log("EmulatorJS carregado com sucesso!");
        setScriptLoaded(true); // Marcar script como carregado
      };

      script.onerror = () => {
        console.error("Erro ao carregar EmulatorJS");
        alert("Erro ao carregar o emulador. Verifique sua conexão ou tente novamente mais tarde.");
      };

      document.body.appendChild(script);
    }
  }, [jogo, core, scriptLoaded]);

  return (
    <div>
      <>
       <Navbar />
      </>
      
      <Head>
        <title>Emulador - {jogo || "Carregando..."}</title>
      </Head>

     

      <div className={styles.emulatorContainer} style={{ width: "800px", height: "500px", margin: "0 auto" }}>
        <div 
          id="game" 
          className={styles.game} 
         style={{ width: "800px", height: "500px" }}
        ></div>
      </div>
    </div>
  );
}
