import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  // seus estados e refs existentes...
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);
  const boxRef = useRef(null);

  // Novos refs para a div flutuante amarela
  const floatingRef = useRef(null);
  const isDraggingFloating = useRef(false);
  const dragOffsetFloating = useRef({ x: 0, y: 0 });

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
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

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

  // Funções toggleCamera, connectToPeer etc permanecem iguais...

  // Funções de arrastar para a div principal (já existentes)...
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

  // Eventos touch para div principal
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

  // Funções para arrastar a div flutuante amarela
  const onMouseDownFloating = (e) => {
    if (e.target === floatingRef.current.querySelector(".floating-header")) {
      isDraggingFloating.current = true;
      const rect = floatingRef.current.getBoundingClientRect();
      dragOffsetFloating.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener("mousemove", onMouseMoveFloating);
      document.addEventListener("mouseup", onMouseUpFloating);
      e.preventDefault();
    }
  };
  const onMouseMoveFloating = (e) => {
    if (!isDraggingFloating.current) return;
    let left = e.clientX - dragOffsetFloating.current.x;
    let top = e.clientY - dragOffsetFloating.current.y;

    const maxLeft = window.innerWidth - floatingRef.current.offsetWidth;
    const maxTop = window.innerHeight - floatingRef.current.offsetHeight;
    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

    floatingRef.current.style.left = `${left}px`;
    floatingRef.current.style.top = `${top}px`;
  };
  const onMouseUpFloating = () => {
    isDraggingFloating.current = false;
    document.removeEventListener("mousemove", onMouseMoveFloating);
    document.removeEventListener("mouseup", onMouseUpFloating);
  };

  const onTouchStartFloating = (e) => {
    const touch = e.touches[0];
    if (e.target === floatingRef.current.querySelector(".floating-header")) {
      isDraggingFloating.current = true;
      const rect = floatingRef.current.getBoundingClientRect();
      dragOffsetFloating.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      e.preventDefault();
    }
  };
  const onTouchMoveFloating = (e) => {
    if (!isDraggingFloating.current) return;
    const touch = e.touches[0];
    let left = touch.clientX - dragOffsetFloating.current.x;
    let top = touch.clientY - dragOffsetFloating.current.y;

    const maxLeft = window.innerWidth - floatingRef.current.offsetWidth;
    const maxTop = window.innerHeight - floatingRef.current.offsetHeight;
    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

    floatingRef.current.style.left = `${left}px`;
    floatingRef.current.style.top = `${top}px`;
  };
  const onTouchEndFloating = () => {
    isDraggingFloating.current = false;
  };

  return (
    <>
      {/* Caixa principal existente */}
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
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          userSelect: "none",
          overflow: "hidden",
          touchAction: "none",
          resize: "both",
        }}
      >
        {/* Cabeçalho arrastável */}
        <div
          className="header"
          style={{
            backgroundColor: "#1f252c",
            padding: "10px 14px",
            cursor: "grab",
            fontWeight: "700",
            fontSize: 14,
            borderBottom: "1px solid #2f3640",
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
              cursor: "pointer",
              width: 28,
              height: 28,
            }}
          >
            {minimized ? "▢" : "−"}
          </button>
        </div>

        {!minimized && (
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
                fontSize: 14,
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
                padding: 10,
                borderRadius: 6,
                border: "1.5px solid #3a3f47",
                marginBottom: 12,
                backgroundColor: "#222831",
                color: "#d7dae0",
                fontSize: 14,
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
           
            
          </div>
        )}
      </div>

      {/* Div flutuante amarela redimensionável e arrastável */}
      <div
        ref={floatingRef}
        onMouseDown={onMouseDownFloating}
        onTouchStart={onTouchStartFloating}
        onTouchMove={onTouchMoveFloating}
        onTouchEnd={onTouchEndFloating}
        style={{
          position: "fixed",
          top: 150,
          right: 20,
          width: 180,
          height: 300,
          backgroundColor: "#333",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          zIndex: 2147483648,
          userSelect: "none",
          touchAction: "none",
          resize: "both",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="floating-header"
          style={{
            backgroundColor: "#e5c100",
            padding: "6px 10px",
            cursor: "grab",
            fontWeight: "700",
            fontSize: 13,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            color: "#333",
            userSelect: "none",
          }}
        >
          Div Flutuante
        </div>
        <div style={{ padding: 10, flex: 1, overflowY: "auto", fontSize: 14 }}>
           <div>
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  marginTop: 12,
                  borderRadius: 8,
                  backgroundColor: "#000",
                }}
              />
            </div>

            <div>
              <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                marginTop: 12,
                borderRadius: 8,
                backgroundColor: "#000",
              }}
            />
            </div>
        </div>
      </div>
    </>
  );

  // Função toggleCamera, connectToPeer continuam aqui (não alteradas)...
  function toggleCamera() {
    if (cameraOn) {
      // parar câmera
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      localStreamRef.current = null;
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      setCameraOn(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localStreamRef.current = stream;
          if (localVideoRef.current) localVideoRef.current.srcObject = stream;
          setCameraOn(true);
        })
        .catch(() => alert("Erro ao acessar a câmera"));
    }
  }

  function connectToPeer() {
    if (!peerRef.current || !remoteId) return;
    if (!cameraOn) {
      alert("Ligue sua câmera antes de conectar.");
      return;
    }
    const call = peerRef.current.call(remoteId, localStreamRef.current);
    callRef.current = call;

    call.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      setConnected(true);
    });
    call.on("close", () => {
      setConnected(false);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });
  }
}
