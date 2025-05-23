import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);
  const boxRef = useRef(null);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

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

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
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
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
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

  // Drag - mouse
  const onMouseDown = (e) => {
    if (e.target === boxRef.current.querySelector(".header")) {
      isDragging.current = true;
      const rect = boxRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      e.preventDefault();
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    let left = e.clientX - dragOffset.current.x;
    let top = e.clientY - dragOffset.current.y;

    const maxLeft = window.innerWidth - boxRef.current.offsetWidth;
    const maxTop = window.innerHeight - boxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    boxRef.current.style.left = `${left}px`;
    boxRef.current.style.top = `${top}px`;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Drag - touch
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    if (e.target === boxRef.current.querySelector(".header")) {
      isDragging.current = true;
      const rect = boxRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      e.preventDefault();
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    let left = touch.clientX - dragOffset.current.x;
    let top = touch.clientY - dragOffset.current.y;

    const maxLeft = window.innerWidth - boxRef.current.offsetWidth;
    const maxTop = window.innerHeight - boxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    boxRef.current.style.left = `${left}px`;
    boxRef.current.style.top = `${top}px`;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
    ref={boxRef}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
    style={{
      position: "fixed",
      top: 80,
      left: 20,
      zIndex: 2147483647, // maior z-index para o botão também
      width: 197, // reduzido 20%
      maxWidth: "95vw",
      background: "#1e1e1e",
      color: "#ddd",
      borderRadius: 8,
      boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: "none",
      overflow: "hidden",
      touchAction: "none",
    }}
  >
      <div
        className="header"
        style={{
          backgroundColor: "#121212",
          padding: "8px 12px",
          cursor: "grab",
          fontWeight: "bold",
          fontSize: 13,
          borderBottom: "1px solid #333",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Conexão Webcam
        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: "none",
            border: "none",
            color: "#0af",
            fontSize: 18,
            lineHeight: 1,
            cursor: "pointer",
            userSelect: "none",
            padding: 0,
            marginLeft: 8,
            fontWeight: "bold",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={minimized ? "Restaurar janela" : "Minimizar janela"}
          type="button"
        >
          {minimized ? "▢" : "−"}
        </button>
      </div>

      {!minimized && (
        <div style={{ padding: "10px 12px" }}>
          <div style={{ fontSize: 10, marginBottom: 8 }}>
            <strong>Seu ID:</strong>
            <br />
            <code
              style={{
                background: "#333",
                padding: "3px 7px",
                borderRadius: 3,
                display: "inline-block",
                marginTop: 3,
                maxWidth: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {myPeerId || "gerando..."}
            </code>
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
                fontSize: 10,
                color: "#0af",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                userSelect: "auto",
              }}
              type="button"
            >
              Copiar ID
            </button>
          </div>

          <button
            onClick={toggleCamera}
            style={{
              background: cameraOn ? "#b33030" : "#2e8b57",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "8px 0",
              borderRadius: 4,
              marginBottom: 10,
              width: "100%",
              fontWeight: "600",
              fontSize: 13,
              userSelect: "none",
              transition: "background-color 0.3s",
            }}
            type="button"
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
              padding: 7,
              borderRadius: 4,
              border: "1px solid #555",
              marginBottom: 8,
              backgroundColor: "#222",
              color: "#eee",
              fontSize: 13,
              userSelect: "text",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={connectToPeer}
            disabled={!remoteId}
            style={{
              width: "100%",
              padding: "8px 0",
              background: !remoteId ? "#666" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: !remoteId ? "not-allowed" : "pointer",
              fontSize: 13,
              fontWeight: "600",
              userSelect: "none",
              transition: "background-color 0.3s",
            }}
            type="button"
          >
            Conectar
          </button>

          <video
            ref={remoteVideoRef}
      autoPlay
      playsInline
        style={{
          width: "100%",
          height: 105, // reduzido 20%
          marginTop: 10,
          background: "#000",
          borderRadius: 4,
          userSelect: "none",
        }}
      />

          {connected && (
            <p
              style={{
                marginTop: 6,
                fontSize: 11,
                color: "#0f0",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Conectado ✅
            </p>
          )}
        </div>
      )}
    </div>
  );
}
