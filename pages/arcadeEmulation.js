import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Emulation.module.css';
import Navbar from '../components/Navbar';
import PeerConnection from "../components/PeerConnection";



export default function Emulation() {
  const { query } = useRouter();

  useEffect(() => {

    const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
    const altura = Math.round((largura * 3) / 4 / 2) * 2;

    const checkCanvas = setInterval(() => {
      if (document.getElementById("game")) {
        clearInterval(checkCanvas);

        Object.assign(window, {
          EJS_player: "#game",
          EJS_core: query.core,
          EJS_multitap: true,
          EJS_gameName: query.jogo,
          EJS_gameUrl: `${window.location.origin}/roms/${query.jogo}`,
          EJS_canvasWidth: largura,
          EJS_canvasHeight: altura,
          EJS_fullscreenOnLoad: true,
        });

        if (!document.querySelector('script[src="https://www.emulatorjs.com/loader.js"]')) {
          const script = document.createElement("script");
          script.src = "https://www.emulatorjs.com/loader.js";
          script.async = true;
          script.crossOrigin = "anonymous";
          script.onload = () => console.log("EmulatorJS carregado!");
          script.onerror = () => alert("Erro ao carregar o emulador.");
          document.body.appendChild(script);
        }
      }
    }, 100);

    return () => clearInterval(checkCanvas);
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className={styles.emulatorContainer} style={{ position: "relative", width: "800px", height: "500px", maxWidth: "90%", margin: "0 auto" }}>
        
        <div
          id="game"
          className={styles.game}
          style={{ width: "800px", height: "500px", maxWidth: "100%" }}
        >
         
          <PeerConnection peerId={query.peerId} />
        </div>
      </div>
    </div>
  );
}
