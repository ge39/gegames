import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

export default function Emulation() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { jogo, core } = router.query;
  
  useEffect(() => {
    if (jogo) {
      // Configurações do EmulatorJS
      const emulatorConfig = {
        EJS_startOnLoaded: false,
        EJS_player: "#game",
        EJS_core: core,
        EJS_gameName: jogo || "Jogo Padrão",
        EJS_start: "Start Game",
        EJS_color: "#0064ff",
        EJS_gameUrl: `../../roms/${jogo}`,
        EJS_biosUrl: "",
        EJS_pathtodata: "",
      };
  
      Object.assign(window, emulatorConfig);
  
      // Carregar o script do EmulatorJS
      const script = document.createElement("script");
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
  
      script.onload = () => {
        console.log("EmulatorJS carregado com sucesso!");
      };
  
      script.onerror = () => {
        console.error("Erro ao carregar o script do EmulatorJS");
        alert(
          "Erro ao carregar o emulador. Verifique sua conexão ou tente novamente mais tarde."
        );
      };
  
      // Evitar duplicações no carregamento do script
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.body.appendChild(script);
      }
  
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [jogo, core]);
                 
  return (
    <div>
     
      {/* Inclusão da Navbar */}
      <Navbar />
        <div  className={styles.emulatorContainer}>
        <div id="game" className={styles.game}>
          
        </div>
      </div>
      {/* Inclusão da Rodapé */}
       {/* <Footer /> */}
      
    </div>
  );
}
