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
  const boxRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

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

    try {
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
    } catch (err) {
      alert("Erro ao tentar iniciar a chamada. Verifique o ID.");
    }
  };

  // Função de arrastar
  const handleMouseDown = (e) => {
    isDragging.current = true;
    const box = boxRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - box.left, y: e.clientY - box.top };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    boxRef.current.style.left = `${e.clientX - offset.current.x}px`;
    boxRef.current.style.top = `${e.clientY - offset.current.y}px`;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: 100,
        left: 20,
        width: 280,
        background: "#1e1e1e",
        color: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        padding: 14,
        zIndex: 9999,
        cursor: "default",
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          cursor: "move",
          marginBottom: 12,
          fontWeight: "bold",
          fontSize: 15,
          color: "#0af"
        }}
      >
        🔗 Conexão Webcam (arraste aqui)
      </div>

      <div style={{ fontSize: 12, marginBottom: 6 }}>
        <strong>Seu ID:</strong><br />
        <code>{myPeerId || "gerando..."}</code><br />
        <button
          onClick={() => {
            if (myPeerId) {
              navigator.clipboard.writeText(myPeerId);
              alert("ID copiado!");
            }
          }}
          style={{
            fontSize: 11,
            color: "#0af",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            marginTop: 4
          }}
        >
          Copiar ID
        </button>
      </div>

      <button
        onClick={toggleCamera}
        style={{
          background: cameraOn ? "#c62828" : "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 13,
          width: "100%",
          marginBottom: 10,
          cursor: "pointer"
        }}
      >
        {cameraOn ? "Desligar câmera" : "Ligar câmera"}
      </button>

      <label style={{ fontSize: 12, marginBottom: 2, display: "block" }}>
        ID do amigo:
      </label>
      <input
        type="text"
        value={remoteId}
        onChange={(e) => setRemoteId(e.target.value)}
        placeholder="Digite o ID"
        style={{
          width: "100%",
          padding: 6,
          borderRadius: 6,
          border: "1px solid #444",
          marginBottom: 10,
          background: "#222",
          color: "#fff"
        }}
      />

      <button
        onClick={connectToPeer}
        disabled={!remoteId}
        style={{
          width: "100%",
          padding: "6px 10px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14,
          marginBottom: 10
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
          background: "#000",
          borderRadius: 6
        }}
      />

      {connected && (
        <p style={{ marginTop: 8, fontSize: 12, color: "#0f0" }}>
          ✅ Conectado com sucesso!
        </p>
      )}
    </div>
  );
}
