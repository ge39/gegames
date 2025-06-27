import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>
      <Emulator
        // biosUrl="/roms/psone/files/scph5501.bin"
        // gameUrl="/roms/psone/Bust-A-Move 4.PBP"
        // core="beetle-psx"
           <script>
            EJS_player = "#game";
            EJS_core = "psx";
            EJS_color = "#0064ff";
            EJS_startOnLoaded = true;
            EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
            EJS_gameUrl = "/roms/psone/Bust-A-Move 4.PBP";
            EJS_biosUrl = "/roms/psone/files/scph5501.bin";
        </script>
        <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>

      />
    </div>
  );
}
