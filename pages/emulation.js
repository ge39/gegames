import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

export default function Emulation() {
  const router = useRouter();
  const { jogo = "Super Mario World.zip", core = "snes" } = router.query; // Valores padrão

  useEffect(() => {
    if (jogo && core) {
      // Configurações do EmulatorJS
      const emulatorConfig = {
        EJS_startOnLoaded: false,
        EJS_player: "#game",
        EJS_core: core,
        EJS_gameName: jogo || "Jogo Padrão",
        EJS_start: "Start Game",
        EJS_color: "#0064ff",
        EJS_gameUrl: `../roms/${jogo}`,
        EJS_biosUrl: "",
        EJS_pathtodata: "https://cdn.emulatorjs.org/stable/data/",
      };

      Object.assign(window, emulatorConfig);

      // Carregar o script do EmulatorJS
      const script = document.createElement("script");
      script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
      script.async = true;

      // Verificar e evitar duplicações no carregamento do script
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.body.appendChild(script);
      }

      script.onload = () => {
        console.log("EmulatorJS carregado com sucesso!");
      };

      script.onerror = () => {
        console.error("Erro ao carregar o script do EmulatorJS");
        alert(
          "Erro ao carregar o emulador. Verifique sua conexão ou tente novamente mais tarde."
        );
      };

      return () => {
        // Remover script apenas se ele existir
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [jogo, core]);

  return (
    <div>
      {/* Inclusão da Navbar */}
      <Navbar />
      <div className={styles.emulatorContainer}>
        <div id="game" className={styles.game} />
      </div>
      {/* Inclusão do Rodapé (descomentado, se necessário) */}
      {/* <Footer /> */}
    </div>
  );
}
