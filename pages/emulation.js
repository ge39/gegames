import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Emulation.module.css";
import Navbar from "../components/Navbar";

export default function Emulation() {
  const router = useRouter();
  const [jogo, setJogo] = useState(null);
  const [core, setCore] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { jogo, core } = router.query;

    if (jogo && core) {
      setJogo(jogo);
      setCore(core);

      // Remover os parâmetros da URL sem recarregar a página
      // router.replace("/emulation", undefined, { shallow: true });

      // Definir tamanho baseado na janela, garantindo que seja sempre par
      const calcularAspectRatio = () => {
        const largura = window.innerWidth;
        const altura = window.innerHeight;

        const aspectRatio = largura / altura;

        // Garante que o aspect ratio seja sempre um número par
        return Math.round(aspectRatio * 10) % 2 === 0
          ? aspectRatio
          : aspectRatio + 0.1;
      };

      // Configuração do EmulatorJS
      window.EJS_player = "#game";
      window.EJS_core = core;
      window.EJS_gameName = jogo || "Jogo Padrão";
      window.EJS_gameUrl = `/roms/${jogo}`;
      window.EJS_biosUrl = "";
      window.EJS_canvasWidth = 1024;
      window.EJS_canvasHeight = 768;
      window.EJS_fullscreenOnLoad = true;
      window.EJS_AspectRatio = calcularAspectRatio();

      console.log("Aspect Ratio Ajustado:", window.EJS_AspectRatio);

      // Carregar o script do EmulatorJS apenas uma vez
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";

      script.onload = () => console.log("EmulatorJS carregado!");
      script.onerror = () => alert("Erro ao carregar o emulador.");

      document.body.appendChild(script);
    }
  }, [router.query]);

  return (
    <div>
      <Navbar />
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
