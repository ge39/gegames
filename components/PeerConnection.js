import { useEffect, useRef, useState, useCallback } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [minimized, setMinimized] = useState(true);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);
  const boxRef = useRef(null);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // ✅ Função estável com useCallback
  const toggleCamera = useCallback(async () => {
    if (cameraOn) {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setCameraOn(true);
      } catch (err) {
        alert("Erro ao acessar a câmera: " + err.message);
      }
    }
  }, [cameraOn]);

  // ✅ Inicializa PeerJS e vídeo local
  useEffect(() => {
  let isMounted = true;

  const toggleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      window.localStream = stream;
      setCameraOn(true);
    } catch (err) {
      alert("Erro ao acessar a câmera: " + err.message);
    }
  };

  const setupPeer = async () => {
    if (!window.peerInstance) {
      const storedId = localStorage.getItem("myPeerId");
      const peer = storedId ? new Peer(storedId) : new Peer();
      peerRef.current = peer;
      window.peerInstance = peer;

      peer.on("open", (id) => {
        if (!isMounted) return;
        setMyPeerId(id);
        localStorage.setItem("myPeerId", id);
      });

      peer.on("call", (call) => {
        if (!window.localStream) {
          console.warn("Stream local não disponível para responder à chamada.");
          return;
        }

        call.answer(window.localStream);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
          setConnected(true);
        });

        call.on("close", () => {
          setConnected(false);
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        });

        callRef.current = call;
      });
    } else {
      peerRef.current = window.peerInstance;
      setMyPeerId(peerRef.current.id);
    }

    if (window.localStream) {
      localStreamRef.current = window.localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = window.localStream;
      setCameraOn(true);
    } else {
      toggleCamera(); // ✅ chamada local, estável e segura
    }
  };

  setupPeer();
  return () => { isMounted = false; };
}, []);


  // ✅ Conecta ao peer remoto
  const connectToPeer = () => {
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

  // ✅ Eventos de arrasto
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
    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

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
    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

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
        top: 60,
        left: 10,
        zIndex: 2147483647,
        width: 170,
        maxWidth: "95vw",
        background: "transparent",
        color: "#e1e1e1",
        borderRadius: 10,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.75)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        overflow: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

      <div
        className="header"
        style={{
          backgroundColor: "transparent",
          padding: "10px 14px",
          cursor: "grab",
          fontWeight: "700",
          fontSize: 14,
          borderBottom: "1px solid #2f3640",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "snow",
          textShadow: "0 0 5px red",
          touchAction: "none",
        }}
      >
        Webcam
        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: "transparent",
            border: "none",
            color: "#66d9ef",
            fontSize: 12,
            cursor: "pointer",
            width: 28,
            height: 28,
          }}
        >
          {minimized ? "Open" : "Close"}
        </button>
      </div>

      {!minimized && (
        <div style={{ padding: 14, fontSize: 13, color: "#58a6ff" }}>
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
                fontSize: 10,
                color: "#58a6ff",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "600",
              }}
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
              fontSize: 12,
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
              width: "95%",
              padding: 5,
              borderRadius: 6,
              border: "1.5px solid #3a3f47",
              marginBottom: 12,
              backgroundColor: "transparent",
              color: "#d7dae0",
              fontSize: 12,
              fontWeight: "500",
            }}
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
            }}
          >
            Conectar
          </button>

          {connected && (
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#4ade80",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Conectado ✅
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 6,
              marginTop: 14,
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%",
                display: "inline-flex",
                maxHeight: "120px",
                background: "transparent",
                borderRadius: 6,
                objectFit: "contain",
              }}
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                display: "inline-block",
                maxHeight:  "120px",
                background: "transparent",
                borderRadius: 6,
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
