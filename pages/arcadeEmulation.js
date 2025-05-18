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
      // Configura o emulador com base no jogo da URL
      window.EJS_player = "#game";
      window.EJS_core = `${core}`; 
      window.EJS_gameName = jogo || 'Jogo Padrão'; // Nome do jogo
      window.EJS_color = "#0010"; 
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
    <div className={styles.emulatorContainer} style={{  width: "800px", height: "500px", maxWidth: "100%", margin: "0 auto"}}>
      <div 
        id="game" 
        className={styles.game} 
        style={{ width: "800px", height: "500px", maxWidth: "100%" }}
      ></div>
    </div>
  </div>
  );
}
