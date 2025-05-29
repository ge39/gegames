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

  // Drag handlers (mouse & touch)
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
        zIndex: 2147483647,
        width: 200,
        maxWidth: "95vw",
        background: "#12151a",
        color: "#e1e1e1",
        borderRadius: 10,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.75)",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <div
        className="header"
        style={{
          backgroundColor: "#1f252c",
          padding: "10px 14px",
          cursor: "grab",
          fontWeight: "700",
          fontSize: 14,
          borderBottom: "1px solid #2f3640",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#58a6ff",
          textShadow: "0 0 5px #58a6ff66",
        }}
      >
        Conexão Webcam
        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: "transparent",
            border: "none",
            color: "#58a6ff",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            userSelect: "none",
            padding: 0,
            marginLeft: 8,
            fontWeight: "700",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.3s",
          }}
          aria-label={minimized ? "Restaurar janela" : "Minimizar janela"}
          type="button"
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a0c4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#58a6ff")}
        >
          {minimized ? "▢" : "−"}
        </button>
      </div>

      {!minimized && (
        <div style={{ padding: "14px 16px", fontSize: 13, color: "#d7dae0" }}>
          <div style={{ fontSize: 11, marginBottom: 10, lineHeight: 1.3 }}>
            <strong>Seu ID:</strong>
            <br />
            <code
              style={{
                background: "#222831",
                padding: "5px 10px",
                borderRadius: 6,
                display: "inline-block",
                marginTop: 6,
                maxWidth: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                fontWeight: "600",
                letterSpacing: "0.03em",
                userSelect: "all",
                boxShadow: "inset 0 0 5px #0f1620",
                color: "#66d9ef",
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
                marginTop: 6,
                fontSize: 11,
                color: "#58a6ff",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                userSelect: "auto",
                fontWeight: "600",
              }}
              type="button"
            >
              Copiar ID
            </button>
          </div>

          <button
            onClick={toggleCamera}
            style={{
              background: cameraOn ? "#d94c4c" : "#3ba662",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "10px 0",
              borderRadius: 6,
              marginBottom: 14,
              width: "100%",
              fontWeight: "700",
              fontSize: 14,
              userSelect: "none",
              boxShadow: cameraOn
                ? "0 4px 12px rgba(217, 76, 76, 0.7)"
                : "0 4px 12px rgba(59, 166, 98, 0.7)",
              transition: "background-color 0.3s, box-shadow 0.3s",
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
              padding: 10,
              borderRadius: 6,
              border: "1.5px solid #3a3f47",
              marginBottom: 12,
              backgroundColor: "#222831",
              color: "#d7dae0",
              fontSize: 14,
              fontWeight: "500",
              userSelect: "text",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#58a6ff")}
            onBlur={(e) => (e.target.style.borderColor = "#3a3f47")}
          />

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
              userSelect: "none",
              boxShadow: !remoteId
                ? "none"
                : "0 6px 15px rgba(46, 164, 79, 0.6)",
              transition: "background-color 0.3s, box-shadow 0.3s",
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
              height: 110,
              marginTop: 14,
              background: "#000",
              borderRadius: 8,
              userSelect: "none",
              boxShadow: "inset 0 0 8px #111",
            }}
          />

          {connected && (
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#4ade80",
                textAlign: "center",
                userSelect: "none",
                fontWeight: "600",
                textShadow: "0 0 5px #4ade80aa",
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
