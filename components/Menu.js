import Link from 'next/link';
import styles from '../styles/Menu.module.css';

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          Fliperama Retrô {/* Link para a página Home */}
        </Link>
      </div>
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/gamelist">JogueOnline</Link></li>
        <li><Link href="/sobre">Sobre</Link></li>
        <li><Link href="/contato">Contato</Link></li>
       </ul>
    </nav>
  );
}
