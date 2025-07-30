 import Link from 'next/link';

export default function Console() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', maxWidth: '100%', marginTop: '80px', borderRadius: '10px' }}>
        <Link style={{ textDecoration: 'none' }} href="/gamelistAtari">Atari - </Link>
        <Link style={{ textDecoration: 'none' }} href="/gamelistArcade">Arcade - </Link>
        <Link style={{ textDecoration: "none" }} href="/gamelistGba">Gba - </Link>
        <Link style={{ textDecoration: 'none' }} href="/gamelistMegadrive">Megadrive - </Link>
        <Link style={{ textDecoration: 'none' }} href="/gamelistSnes">Super Nintendo - </Link>
      </h2>
    </div>
  );
