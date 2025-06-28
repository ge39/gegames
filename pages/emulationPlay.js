import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  const bios = "/roms/psone/files/scph1001.bin";
  const game = "/roms/psone/Ace Combat 2.PBP";
  const core = "psx";

  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>

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
