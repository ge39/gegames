import Link from 'next/link';
import styles from '../styles/ButtonTop.module.css';

const ButtonTop = ({ href, text }) => {
  return (
    <div className={styles.buttonTopBack}>
      <Link href={href}>{text}</Link>
    </div>
  );
};

export default ButtonTop;
