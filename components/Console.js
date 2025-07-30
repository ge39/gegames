import Link from 'next/link';

export default function Console() {
  const links = [
    { href: '/gamelistAtari', label: 'Atari' },
    { href: '/gamelistArcade', label: 'Arcade' },
    { href: '/gamelistGba', label: 'GBA' },
    { href: '/gamelistMegadrive', label: 'Mega Drive' },
    { href: '/gamelistSnes', label: 'Super Nintendo' },
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <nav style={{ display: 'inline-block', borderRadius: '10px' }}>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: 'none',
              margin: '0 8px',
              color: '#333',
              fontWeight: 'bold',
            }}
          >
            {link.label}
            {index < links.length - 1 ? ' - ' : ''}
          </Link>
        ))}
      </nav>
    </div>
  );
}

