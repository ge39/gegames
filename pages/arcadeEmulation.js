const [tamanho, setTamanho] = useState({ largura: 800, altura: 600 });
const [scriptLoaded, setScriptLoaded] = useState(false);

useEffect(() => {
  if (!query?.jogo || !query?.core || typeof window === "undefined") return;

  const largura = Math.round((window.innerWidth * 0.8) / 2) * 2;
  const altura = Math.round((largura * 3) / 4 / 2) * 2;
  setTamanho({ largura, altura });

  const checkCanvas = setInterval(() => {
    const container = document.getElementById("game");
    if (container) {
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

      if (!scriptLoaded) {
        const script = document.createElement("script");
        script.src = "https://www.emulatorjs.com/loader.js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => {
          console.log("EmulatorJS carregado!");
          setScriptLoaded(true);
        };
        script.onerror = () => alert("Erro ao carregar o emulador.");
        document.body.appendChild(script);
      }
    }
  }, 100);

  return () => clearInterval(checkCanvas);
}, [query]);
