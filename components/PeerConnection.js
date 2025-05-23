import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const draggingRef = useRef(false);
  const positionRef = useRef({ x: 20, y: 20 });
  const containerRef = useRef(null);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);

  // Peer init
  useEffect(() => {
    const peer = new Peer(); // Gera ID aleatório
    peerRef.current = peer;

    peer.on("open", (id) => setMyPeerId(id));

    peer.on("call", async (call) => {
      if (!cameraOn) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
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
      } catch (error) {
        alert("Erro ao acessar a câmera: " + error.message);
      }
    });

    return () => peer.destroy();
  }, [cameraOn]);

  const toggleCamera = async () => {
    if (cameraOn) {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
        setCameraOn(true);
      } catch (err) {
        alert("Erro ao acessar a câmera: " + err.message);
      }
    }
  };

  const connectToPeer = () => {
    if (!cameraOn) return alert("Ligue a câmera antes de conectar.");
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
    } catch {
      alert("Erro ao tentar iniciar a chamada. Verifique o ID.");
    }
  };

  const disconnect = () => {
    callRef.current?.close();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    setConnected(false);
    setCameraOn(false);
  };

  // Movimento da div
  const startDrag = (e) => {
    draggingRef.current = true;
    positionRef.current = {
      x: e.clientX - containerRef.current.offsetLeft,
      y: e.clientY - containerRef.current.offsetTop,
    };
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const handleDrag = (e) => {
    if (!draggingRef.current) return;
    containerRef.current.style.left = `${e.clientX - positionRef.current.x}px`;
    containerRef.current.style.top = `${e.clientY - positionRef.current.y}px`;
  };

  const stopDrag = () => {
    draggingRef.current = false;
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        width: 200,
        background: "#111",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        fontFamily: "sans-serif",
        fontSize: 12,
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
        userSelect: "none",
        cursor: "move",
      }}
      onMouseDown={startDrag}
    >
      <div>
        <strong>ID:</strong>
        <div style={{ fontSize: 10, wordWrap: "break-word" }}>{myPeerId || "gerando..."}</div>
        {myPeerId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(myPeerId);
              alert("ID copiado!");
            }}
            style={{
              marginTop: 4,
              fontSize: 10,
              color: "#0af",
              background: "none",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Copiar ID
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "center" }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          width={80}
          height={60}
          style={{
            background: "#222",
            borderRadius: 4,
            border: "1px solid #333",
            opacity: cameraOn ? 1 : 0.4,
          }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          width={80}
          height={60}
          style={{
            background: "#000",
            borderRadius: 4,
            border: "1px solid #333",
          }}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label style={{ fontSize: 11 }}>ID do amigo:</label>
        <input
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          placeholder="Cole o ID aqui"
          style={{
            width: "100%",
            padding: 4,
            fontSize: 11,
            marginTop: 2,
            background: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: 4,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>

      <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCamera();
          }}
          style={{
            flex: 1,
            fontSize: 11,
            background: cameraOn ? "#d33" : "#3a3",
            color: "#fff",
            border: "none",
            padding: 4,
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {cameraOn ? "Desligar" : "Ligar"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            connectToPeer();
          }}
          disabled={!remoteId}
          style={{
            flex: 1,
            fontSize: 11,
            background: "#06c",
            color: "#fff",
            border: "none",
            padding: 4,
            borderRadius: 4,
            cursor: remoteId ? "pointer" : "not-allowed",
          }}
        >
          Conectar
        </button>
      </div>

      {connected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            disconnect();
          }}
          style={{
            marginTop: 4,
            width: "100%",
            fontSize: 11,
            background: "#a00",
            color: "#fff",
            border: "none",
            padding: 4,
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Desconectar
        </button>
      )}
    </div>
  );
}
