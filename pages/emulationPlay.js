import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>
      <Emulator
        biosUrl="/roms/psone/bios/scph5501.bin"
        gameUrl="/roms/psone/Bust-A-Move 4.PBP"
        core="psx"
      />
    </div>
  );
}
