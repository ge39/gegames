'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
      <nav className={styles.menu} style={{ display: isOpen ? 'flex' : '' }}>
        <Link href="/">Home</Link>
        <Link href="/jogos-online">Jogue online</Link>
        <Link href="/orcamento">Orcamento</Link>
        <Link href="/locacao">Evento</Link>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
