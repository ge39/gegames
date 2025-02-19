"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import OnlineCounter from "../components/OnlineCounter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return ( 
    <>
                  
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">Gegames</Link>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
        </div>

        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/gamelist">Jogue Online</Link>
          </li>
          <li>
            <Link href="/#orcamento">Fale Conosco</Link>
          </li>
          <li>
            <Link href="/#nosso-plano">Nossos Planos</Link>
          </li>
          <li>
            <Link href="/#eventos">Eventos</Link>
          </li>

          <li
            className={styles.hasSubmenu}
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <Link href="#">Imagem</Link>
            {submenuOpen && (
              <ul className={styles.submenu}>
                <li><Link href="/imageLess">Reduz Imagem</Link></li>
                <li><Link href="/imagePlus">Amplia Imagem</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/#sobre">Sobre</Link>
          </li>
        </ul>
      </nav>
      <div>
  <OnlineCounter />
</div>
    </>
  );
}
