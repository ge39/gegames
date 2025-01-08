import styles from '../styles/ButtonTop.module.css';

const ButtonTop = ({ href, text }) => {
  return (
    <div className={styles.buttonTopBack}>
      <a href={href}>{text}</a>
    </div>
  );
};

export default ButtonTop;
