import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Emulation.module.css";
import Navbar from "../components/Navbar";

export default function Emulation() {
  const router = useRouter();
  const { jogo, core } = router.query; // Extraindo query parameters corretamente

  useEffect(() => {
    if (!jogo || !core || typeof window === "undefined") return;

    const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
    const altura = Math.round((largura * 3) / 4 / 2) * 2;

    Object.assign(window, {
      EJS_player: "#game",
      EJS_core: core,
      EJS_gameName: jogo,
      EJS_gameUrl: `/roms/${jogo}`,
      EJS_canvasWidth: largura,
      EJS_canvasHeight: altura,
      EJS_fullscreenOnLoad: true,
    });

    console.log("Emulador configurado:", largura, "x", altura);

    if (!document.querySelector('script[src="https://www.emulatorjs.com/loader.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => console.log("EmulatorJS carregado!");
      script.onerror = () => alert("Erro ao carregar o emulador.");
      document.body.appendChild(script);
    }
  }, [jogo, core]); // Atualiza sempre que os parâmetros da query mudam

  return (
    <div>
      <Navbar />
      <div className={styles.emulatorContainer} style={{ width: "80%", height: "500px", margin: "0 auto" }}>
        <div id="game" className={styles.game} style={{ width: "800px", height: "500px" }}></div>
      </div>
    </div>
  );
}
