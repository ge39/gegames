import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const storedId = localStorage.getItem("myPeerId");
    const peer = storedId ? new Peer(storedId) : new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setMyPeerId(id);
      localStorage.setItem("myPeerId", id);
    });

    peer.on("call", async (call) => {
      if (!cameraOn) return;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      call.answer(stream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        setConnected(true);
      });

      call.on("close", () => {
        setConnected(false);
        remoteVideoRef.current.srcObject = null;
      });

      callRef.current = call;
    });

    return () => {
      peer.destroy();
    };
  }, [cameraOn]);

  const toggleCamera = async () => {
    if (cameraOn) {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        setCameraOn(true);
      } catch (err) {
        alert("Erro ao acessar a câmera: " + err.message);
      }
    }
  };

  const connectToPeer = async () => {
    if (!cameraOn) {
      alert("Ligue a câmera antes de conectar.");
      return;
    }

    const call = peerRef.current.call(remoteId, localStreamRef.current);

    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
      setConnected(true);
    });

    call.on("close", () => {
      setConnected(false);
      remoteVideoRef.current.srcObject = null;
    });

    callRef.current = call;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        left: 20,
        zIndex: 999999,
        width: 260,
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        fontFamily: "sans-serif",
        padding: 12
      }}
    >
      <strong style={{ fontSize: 14 }}>Conexão Webcam</strong>

      <p style={{ fontSize: 12, margin: "10px 0 6px" }}>
        <strong>Seu ID:</strong><br />
        <code>{myPeerId || "gerando..."}</code>
        <br />
        <button
          onClick={() => {
            if (myPeerId) {
              navigator.clipboard.writeText(myPeerId);
              alert("ID copiado para a área de transferência!");
            }
          }}
          style={{
            marginTop: 5,
            fontSize: 12,
            color: "#0af",
            background: "none",
            border: "none",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Copiar ID
        </button>
      </p>

      <button
        onClick={toggleCamera}
        style={{
          background: "none",
          border: "none",
          color: cameraOn ? "#f33" : "#0f0",
          cursor: "pointer",
          textDecoration: "underline",
          marginBottom: 10
        }}
      >
        {cameraOn ? "Desligar câmera" : "Ligar câmera"}
      </button>

      <input
        type="text"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        placeholder="ID do amigo"
        style={{
          width: "100%",
          padding: 6,
          borderRadius: 4,
          border: "1px solid #ccc",
          marginBottom: 8
        }}
      />

      <button
        onClick={connectToPeer}
        disabled={!remoteId}
        style={{
          width: "100%",
          padding: "6px 10px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14
        }}
      >
        Conectar
      </button>

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: 160,
          marginTop: 10,
          background: "#000",
          borderRadius: 4
        }}
      />

      {connected && (
        <p style={{ marginTop: 6, fontSize: 12, color: "#0f0" }}>Conectado ✅</p>
      )}
    </div>
  );
}
