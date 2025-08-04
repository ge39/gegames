"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  return (
    <>
      <Head>
        <title>GegaMes - Jogos Retrô Online</title>
        <meta name="description" content="Jogue clássicos dos Arcades,Atari, SNES,Game Boy, Mega Drive e mais diretamente do navegador!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gegames.vercel.app/jogos-online-retro" />
      </Head>

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo/Logo gegames-black.png"
              alt="Gegames Logo"
              width={200}
                height={50}
                priority
              />
          </Link>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ''}`} />
        </div>

        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li><Link href="/">Home</Link></li>

          <li className={styles.hasSubmenu} onClick={toggleSubmenu}>
            <span>Jogue Online</span>
            <ul className={`${styles.submenu} ${submenuOpen ? styles.submenuOpen : ''}`}>
              <li><Link href="/gamelistArcade">Arcade</Link></li>
              <li><Link href="/gamelistSnes">SNES</Link></li>
              <li><Link href="/gamelistMegadrive">Mega Drive</Link></li>
              <li><Link href="/gamelistAtari">Atari</Link></li>
              <li><Link href="/gamelistGba">GBA</Link></li>
              <li><Link href="/gamelist">Lista</Link></li>
            </ul>
          </li>

          <li><Link href="/como-jogar">Como Jogar</Link></li>
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
    </>
  );
}
