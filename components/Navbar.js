"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
// import OnlineCounter from './OnlineCounter';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return ( 
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          
        <div className={styles.logo}>
          <Link href="/">
              <Image src="/logo/Logo gegames-black.png" alt="Gegames Logo" width={200} height={50} />
           </Link>
           
      </div>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
        </div>

        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/jogos-online-retro">Jogue Online</Link></li>
          <li><Link href="/#orcamento">Fale Conosco</Link></li>
          <li><Link href="/#nosso-plano">Nossos Planos</Link></li>
          <li><Link href="/#eventos">Eventos</Link></li>
          
          <li className={styles.hasSubmenu}>
            <Link href="#">Imagem</Link>
            <ul className={styles.submenu}>
              <li><Link href="/imageLess">imageLess</Link></li>
              <li><Link href="/imagePlus">imagePlus</Link></li>
            </ul>
          </li>
          
          <li><Link href="/#sobre">Sobre</Link></li>
        </ul>
      </nav>
      {/* <OnlineCounter /> */}
    </>
  );
}
