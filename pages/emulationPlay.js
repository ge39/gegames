import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>
      <Emulator
        biosUrl="/roms/psone/files/scph5501.bin"
        gameUrl="/roms/psone/Crash Bash.PBP"
        core="beetle-psx"
      />
    </div>
  );
}
