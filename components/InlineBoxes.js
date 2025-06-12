import styles from './InlineBoxes.module.css';

export default function InlineBoxes() {
  return (
    <div>
      <div className={styles.box}>
        <button
              onClick={connectToPeer}
              disabled={!remoteId}
              style={{
                width: "100%",
                padding: "10px 0",
                background: !remoteId ? "#555" : "#2ea44f",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: !remoteId ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Conectar
        </button> 
      </div>
      <div className={styles.box}>Box 2</div>
      <div className={styles.box}>Box 3</div>
      <div className={styles.box}>Box 4</div>
    </div>
  );
}
