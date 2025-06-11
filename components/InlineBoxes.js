import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import styles from './InlineBoxes.module.css';

export default function InlineBoxes() {
  return (
    <div className={styles.container}>
         <div style={{ padding: 14, fontSize: 13 }}>
            {/* ...conteúdo existente */}
            <div style={{ fontSize: 11, marginBottom: 10 }}>
              <strong>Seu ID:</strong>
              <br />
              <code
                style={{
                  background: "#222831",
                  padding: "5px 10px",
                  borderRadius: 6,
                  display: "inline-block",
                  marginTop: 6,
                  color: "#66d9ef",
                  fontWeight: 600,
                }}
              >
                {myPeerId || "gerando..."}
              </code>
      <div className={styles.box}>Box 1</div>
      <div className={styles.box}>Box 2</div>
      <div className={styles.box}>Box 3</div>
      <div className={styles.box}>Box 4</div>
    </div>
  );
}
