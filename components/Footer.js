import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>&copy; {new Date().getFullYear()}Fliperama Retrô. Feito com ❤️ para os amantes de jogos clássicos.{' '}</div>
      <span><a href="#">Política de Privacidade</a></span>
    </footer>
  );
};

export default Footer;
