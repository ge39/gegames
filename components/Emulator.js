import { useEffect } from 'react';

export default function Emulator({ gameUrl = '', biosUrl = '', core = 'beetle-psx' }) {
  useEffect(() => {
    if (!gameUrl || !core || !biosUrl) {
      console.error("Parâmetros faltando: gameUrl ou core");
      return;
    }

    window.EJS_player = '#game';
    window.EJS_gameUrl = gameUrl;
    window.EJS_biosUrl = biosUrl || '';
    window.EJS_core = core;

    const script = document.createElement('script');
    script.src = 'https://www.emulatorjs.com/loader.js';
    script.async = true;
    script.onerror = () => console.error("Erro ao carregar EmulatorJS.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [gameUrl, biosUrl, core]);

  return (
    <div style={{ width: '640px', height: '480px', maxWidth: '100%' }}>
      <div id="game" />
    </div>
  );
}
