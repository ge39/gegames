import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
      window.EJS_color = "#0000"; 
      window.EJS_startOnLoaded = true;
      window.EJS_gameUrl = `../../roms/${jogo}`; 
      window.EJS_biosUrl = ""; 

      
      // Carregar o script do EmulatorJS
      const script = document.createElement('script');
      script.src = "https://www.emulatorjs.com/loader.js";
      script.async = true;
      script.onload = () => {
        console.log('EmulatorJS carregado com sucesso!');
        window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/"; 
      };
      script.onerror = () => {
        console.error('Erro ao carregar o script do EmulatorJS');
        alert('Erro ao carregar o emulador. Tente novamente mais tarde.');
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        
      };
    }
  }, [jogo]);

  return (
    <div>
     
      {/* Inclusão da Navbar */}
      <Navbar />
      

      <div className={styles.emulatorContainer}>
        <div id="game" className={styles.emulator}>
          
        </div>
      </div>
      {/* Inclusão da Rodapé */}
      <Footer />
    </div>
  );
}
