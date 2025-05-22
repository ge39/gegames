import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [peerIdParam, setPeerIdParam] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      setMyPeerId(`&peerId=${id}`);
      setPeerIdParam(`&peerId=${id}`);  // <-- variável com concatenação
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        call.answer(stream);
        localVideoRef.current.srcObject = stream;
        call.on("stream", (remoteStream) => {
          setRemoteStream(remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
          setConnected(true);
        });
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const connectToPeer = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      const call = peerRef.current.call(remoteId, stream);
      callRef.current = call;

      call.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
        setConnected(true);
      });

      call.on("close", () => {
        setConnected(false);
        setRemoteStream(null);
      });
    });
  };

  const copyPeerId = () => {
    navigator.clipboard.writeText(myPeerId);
    // alert("ID copiado!");
  };

  // Arrastar a janela
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = position.x;
      initialY = position.y;
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setPosition({ x: initialX + deltaX, y: initialY + deltaY });
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    box.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      box.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position]);

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 999999,
        width: minimized ? 180 : 260,
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        fontFamily: "sans-serif",
        cursor: "move",
        userSelect: "none",
        transition: "all 0.2s ease-in-out"
      }}
    >
      <div
        style={{
          background: "#222",
          padding: "8px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
      >
        <strong style={{ fontSize: 14 }}>Conexão P2P</strong>
        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer"
          }}
          title={minimized ? "Maximizar" : "Minimizar"}
        >
          {minimized ? "▣" : "—"}
        </button>
      </div>

      {!minimized && (
        <div style={{ padding: 10 }}>
          <p style={{ fontSize: 12, margin: "0 0 6px 0", wordBreak: "break-word" }}>
            <strong>Seu ID:</strong><br />{myPeerId}
          </p>
          <p style={{ fontSize: 12, margin: "0 0 10px 0", color: "#aaa" }}>
            <em>Parametro: {peerIdParam}</em>
          </p>

          <button
            onClick={copyPeerId}
            style={{
              width: "100%",
              padding: "6px",
              background: "#00bfff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              marginBottom: 10
            }}
          >
            Copiar ID
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
              marginBottom: 5
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

          <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
            <video ref={localVideoRef} autoPlay muted style={{ width: "48%", height: 90, background: "#000" }} />
            <video ref={remoteVideoRef} autoPlay style={{ width: "48%", height: 90, background: "#000" }} />
          </div>

          {connected && <p style={{ marginTop: 6, fontSize: 12, color: "#0f0" }}>Conectado ✅</p>}
        </div>
      )}
    </div>
  );
}
