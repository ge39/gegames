import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  const bios = "/roms/psone/files/scph5501.bin";
  const game = "/roms/psone/Crash Bash.PBP";
  const core = "beetle-psx";

  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>
       <p><strong>ROM:</strong> {game.split('/').pop()}</p>
       <p><strong>Core:</strong> {core}</p>
       <p><strong>BIOS:</strong> {bios.split('/').pop()}</p>

      <Emulator
        biosUrl={bios}
        gameUrl={game}
        core={core}
      />
    </div>
  );
}
