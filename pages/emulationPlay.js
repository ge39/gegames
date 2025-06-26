import Emulator from '../components/Emulator';

export default function EmulationPlay() {
  return (
    <div>
      <h1>Jogando com EmulatorJS</h1>
      <Emulator
        biosUrl="/roms/psone/files/scph5501.bin"
        gameUrl="/roms/psone/Chessmaster 3D.PBP"
        core="beetle-psx"
      />
    </div>
  );
}
