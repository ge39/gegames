import { useEffect } from 'react';

export default function Emulator({ gameUrl = '', biosUrl = '', core = 'beetle-psx' }) {
  useEffect(() => {
    // Define variáveis globais necessárias pelo EmulatorJS
    window.EJS_player = '#game';
    window.EJS_biosUrl = biosUrl;
    window.EJS_gameUrl = gameUrl;
    window.EJS_core = core;

    // Carrega o script apenas uma vez
    const script = document.createElement('script');
    script.src = 'https://www.emulatorjs.com/loader.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpa o script quando o componente for desmontado
      document.body.removeChild(script);
    };
  }, [gameUrl, biosUrl, core]);

  return (
    <div style={{ width: '640px', height: '480px', maxWidth: '100%' }}>
      <div id="game" />
    </div>
  );
}
