"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import OnlineCounter from "../components/OnlineCounter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">Gegames</Link>
        </div>

        {/* Ícone de menu responsivo */}
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`} />
          <div className={`${styles.bar} ${isOpen ? styles.barOpen : ""}`} />
        </div>

        {/* Menu principal */}
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/jogos-online-retro">Jogue Online</Link></li>
          <li><Link href="/#orcamento">Fale Conosco</Link></li>
          <li><Link href="/#nosso-plano">Nossos Planos</Link></li>
          <li><Link href="/#eventos">Eventos</Link></li>

          {/* Submenu com animação suave */}
          <li
            className={styles.hasSubmenu}
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <Link href="#">Imagem</Link>
            <ul className={`${styles.submenu} ${submenuOpen ? styles.submenuOpen : ""}`}>
              <li><Link href="/imageLess">Image Less</Link></li>
              <li><Link href="/imagePlus">Image Plus</Link></li>
            </ul>
          </li>

          <li><Link href="/#sobre">Sobre</Link></li>
        </ul>
      </nav>

      <div>
        <OnlineCounter />
      </div>
    </>
  );
}
