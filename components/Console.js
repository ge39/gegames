import Link from 'next/link';

export default function Console() {
  const links = [
    { href: '/gamelistAtari', label: 'Atari' },
    { href: '/gamelistArcade', label: 'Arcade' },
    { href: '/gamelistGba', label: 'GBA' },
    { href: '/gamelistMegadrive', label: 'Mega Drive' },
    { href: '/gamelistSnes', label: 'Super Nes' },
    { href: '/adult-games', label: '🔞 Adulto' },
  ];

  return (
    <div>
      {/* Navegação entre consoles */}
      <div style={{ textAlign: 'center', marginTop: '80px', borderColor: 'snow' }}>
        <nav style={{ display: 'inline-block', borderRadius: '10px' }}>
          {links.map((link, index) => (
            <span key={link.href}>
              <Link
                href={link.href}
                style={{
                  textDecoration: 'none',
                  margin: '0 8px',
                  color: 'snow',
                  fontWeight: 'bold',
                }}
              >
                {link.label}
              </Link>
              {index < links.length - 1 && <span> - </span>}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
