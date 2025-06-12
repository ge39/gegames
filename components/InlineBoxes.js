import styles from './InlineBoxes.module.css';

export default function InlineBoxes() {
  return (
    <div>
      <div className={styles.box}>Box 1</div>
      <div className={styles.box}>Box 2</div>
      <div className={styles.box}>Box 3</div>
      <div className={styles.box}>Box 4</div>
    </div>
  );
}
