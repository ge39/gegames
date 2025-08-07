import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()}Fliperama Retrô. Feito com ❤️ para os amantes de jogos clássicos.{' '}</p>
      <p><a href="#">Política de Privacidade</a></p>
    </footer>
  );
};

export default Footer;
