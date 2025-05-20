import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
import WebcamBox from '../components/WebcamBox'; // 👈 NOVO

export default function Emulation() {
  const { query } = useRouter();

  useEffect(() => {
    if (jogo) {
      // Configura o emulador com base no jogo da URL
      window.EJS_player = "#game";
      window.EJS_core = `${core}`; 
      window.EJS_gameName = jogo || 'Jogo Padrão'; // Nome do jogo
      window.EJS_color = "#0000"; 
      window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/"; 
      // window.EJS_startOnLoaded = true;
      window.EJS_gameUrl = `/roms/${jogo}`; 
      window.EJS_biosUrl = ""; 

      
      // Carregar o script do EmulatorJS
      const script = document.createElement('script');
      script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
      script.async = true;
    

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        
      };
    }
  }, [core,jogo]);
                 
  return (
    <div>
      <Navbar />
      <div className={styles.emulatorContainer} style={{ position: "relative", width: "800px", height: "500px", maxWidth: "90%", margin: "0 auto" }}>
        <WebcamBox /> {/* 👈 ADICIONADO */}
        <div
          id="game"
          className={styles.game}
          style={{ width: "800px", height: "500px", maxWidth: "100%" }}
        ></div>
      </div>
    </div>
  );
}
