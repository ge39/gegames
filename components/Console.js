import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/console.module.css'; // Crie esse arquivo CSS

export default function Console() {
  const links = [
    { href: '/gamelistAtari', label: 'Atari', img: '/logo/atari.png' },
    { href: '/gamelistArcade', label: 'Arcade', img: '/logo/arcade.png' },
    { href: '/gamelistGba', label: 'GBA', img: '/logo/gba.png' },
    { href: '/gamelistMegadrive', label: 'Sega', img: '/logo/megadrive.png' },
    { href: '/gamelistSnes', label: 'Super Nes', img: '/logo/snes.png' },
    { href: '/adult-games', label: 'Adulto', img: '/logo/adulto.png' },
  ];

  return (
    <div className={styles.consoleContainer}>
      <nav className={styles.consoleNav}>
        {links.map((link) => (
          <Link href={link.href} key={link.href} className={styles.consoleLink}>
            <div className={styles.consoleItem}>
              <Image src={link.img} alt={link.label} width={40} height={40} />
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
