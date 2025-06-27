// import Emulator from '../components/Emulator';

import { useEffect } from 'react';

export default function EmulationPlay() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Define as variáveis globais do EmulatorJS
      window.EJS_player = "#game";
      window.EJS_core = "psx";
      window.EJS_color = "#0064ff";
      window.EJS_startOnLoaded = true;
      window.EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
      window.EJS_gameUrl = "./roms/psone/Chessmaster 3D.PBP";
      window.EJS_biosUrl = "./roms/psone/files/scph5501.bin";

      // Carrega o loader.js dinamicamente
      const script = document.createElement('script');
      script.src = "https://cdn.emulatorjs.org/stable/data/loader.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Limpeza se necessário
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div style={{ width: '640px', height: '480px', maxWidth: '100%' }}>
      <h1>Jogando com EmulatorJS</h1>
      <div id="game" style={{ width: '640px', height: '480px', maxWidth: '100%' }}></div>
    </div>
  );
}
