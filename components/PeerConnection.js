import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
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

  // Para drag das janelas (local e remoto)
  const remoteBoxRef = useRef(null);
  const localBoxRef = useRef(null);

  const isDraggingRemote = useRef(false);
  const dragOffsetRemote = useRef({ x: 0, y: 0 });
  const isDraggingLocal = useRef(false);
  const dragOffsetLocal = useRef({ x: 0, y: 0 });

  // Funções para drag (remote)
  const onMouseDownRemote = (e) => {
    if (e.target === remoteBoxRef.current.querySelector(".header")) {
      isDraggingRemote.current = true;
      const rect = remoteBoxRef.current.getBoundingClientRect();
      dragOffsetRemote.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener("mousemove", onMouseMoveRemote);
      document.addEventListener("mouseup", onMouseUpRemote);
      e.preventDefault();
    }
  };

  const onMouseMoveRemote = (e) => {
    if (!isDraggingRemote.current) return;
    let left = e.clientX - dragOffsetRemote.current.x;
    let top = e.clientY - dragOffsetRemote.current.y;

    const maxLeft = window.innerWidth - remoteBoxRef.current.offsetWidth;
    const maxTop = window.innerHeight - remoteBoxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    remoteBoxRef.current.style.left = `${left}px`;
    remoteBoxRef.current.style.top = `${top}px`;
  };

  const onMouseUpRemote = () => {
    isDraggingRemote.current = false;
    document.removeEventListener("mousemove", onMouseMoveRemote);
    document.removeEventListener("mouseup", onMouseUpRemote);
  };

  // Funções para drag (local)
  const onMouseDownLocal = (e) => {
    if (e.target === localBoxRef.current.querySelector(".header")) {
      isDraggingLocal.current = true;
      const rect = localBoxRef.current.getBoundingClientRect();
      dragOffsetLocal.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener("mousemove", onMouseMoveLocal);
      document.addEventListener("mouseup", onMouseUpLocal);
      e.preventDefault();
    }
  };

  const onMouseMoveLocal = (e) => {
    if (!isDraggingLocal.current) return;
    let left = e.clientX - dragOffsetLocal.current.x;
    let top = e.clientY - dragOffsetLocal.current.y;

    const maxLeft = window.innerWidth - localBoxRef.current.offsetWidth;
    const maxTop = window.innerHeight - localBoxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    localBoxRef.current.style.left = `${left}px`;
    localBoxRef.current.style.top = `${top}px`;
  };

  const onMouseUpLocal = () => {
    isDraggingLocal.current = false;
    document.removeEventListener("mousemove", onMouseMoveLocal);
    document.removeEventListener("mouseup", onMouseUpLocal);
  };

  // Touch events remote
  const onTouchStartRemote = (e) => {
    const touch = e.touches[0];
    if (e.target === remoteBoxRef.current.querySelector(".header")) {
      isDraggingRemote.current = true;
      const rect = remoteBoxRef.current.getBoundingClientRect();
      dragOffsetRemote.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      e.preventDefault();
    }
  };

  const onTouchMoveRemote = (e) => {
    if (!isDraggingRemote.current) return;
    const touch = e.touches[0];
    let left = touch.clientX - dragOffsetRemote.current.x;
    let top = touch.clientY - dragOffsetRemote.current.y;

    const maxLeft = window.innerWidth - remoteBoxRef.current.offsetWidth;
    const maxTop = window.innerHeight - remoteBoxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    remoteBoxRef.current.style.left = `${left}px`;
    remoteBoxRef.current.style.top = `${top}px`;
  };

  const onTouchEndRemote = () => {
    isDraggingRemote.current = false;
  };

  // Touch events local
  const onTouchStartLocal = (e) => {
    const touch = e.touches[0];
    if (e.target === localBoxRef.current.querySelector(".header")) {
      isDraggingLocal.current = true;
      const rect = localBoxRef.current.getBoundingClientRect();
      dragOffsetLocal.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      e.preventDefault();
    }
  };

  const onTouchMoveLocal = (e) => {
    if (!isDraggingLocal.current) return;
    const touch = e.touches[0];
    let left = touch.clientX - dragOffsetLocal.current.x;
    let top = touch.clientY - dragOffsetLocal.current.y;

    const maxLeft = window.innerWidth - localBoxRef.current.offsetWidth;
    const maxTop = window.innerHeight - localBoxRef.current.offsetHeight;
    if (left < 0) left = 0;
    else if (left > maxLeft) left = maxLeft;
    if (top < 0) top = 0;
    else if (top > maxTop) top = maxTop;

    localBoxRef.current.style.left = `${left}px`;
    localBoxRef.current.style.top = `${top}px`;
  };

  const onTouchEndLocal = () => {
    isDraggingLocal.current = false;
  };

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

      // mostra local video
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      call.answer(stream);

      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setConnected(true);
      });

      call.on("close", () => {
        setConnected(false);
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
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
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      setCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

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
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      setConnected(true);
    });

    call.on("close", () => {
      setConnected(false);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    callRef.current = call;
  };

  return (
    <>
      {/* DIV PRINCIPAL CONTROLES */}
      <div
        style={{
          position: "fixed",
          top: 80,
          left: 20,
          zIndex: 2147483647,
          width: 240,
          maxWidth: "95vw",
          background: "#12151a",
          color: "#e1e1e1",
          borderRadius: 10,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
          userSelect: "none",
          fontFamily: "monospace",
          fontWeight: 600,
          padding: 10,
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <button
            onClick={() => setMinimized(!minimized)}
            style={{
              fontSize: 14,
              color: "#00d46b",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: 6,
            }}
            title="Minimizar/maximizar"
          >
            {minimized ? "▶ Abrir" : "▼ Minimizar"}
          </button>
          {!minimized && (
            <>
              <div style={{ fontSize: 14, marginBottom: 6 }}>
                Seu ID:{" "}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(myPeerId);
                    alert("ID copiado!");
                  }}
                  style={{
                    color: "#3ff37f",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {myPeerId || "Carregando..."}
                </button>
              </div>

              <input
                type="text"
                value={remoteId}
                onChange={(e) => setRemoteId(e.target.value)}
                placeholder="ID do amigo"
                style={{
                  width: "100%",
                  padding: 6,
                  borderRadius: 6,
                  border: "1px solid #222",
                  background: "#111",
                  color: "#eee",
                  marginBottom: 8,
                  fontSize: 14,
                }}
              />
              <button
                onClick={connectToPeer}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "none",
                  background: "#00d46b",
                  color: "#0a0",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              >
                Conectar
              </button>

              <button
                onClick={toggleCamera}
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 6,
                  border: "none",
                  background: cameraOn ? "#f33" : "#3f3",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {cameraOn ? "Desligar Câmera" : "Ligar Câmera"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* VÍDEO REMOTO FLUTUANTE */}
      {connected && (
        <div
          ref={remoteBoxRef}
          className="video-box"
          style={{
            position: "fixed",
            top: 150,
            left: 300,
            width: 320,
            height: 240,
            backgroundColor: "#000",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.75)",
            zIndex: 2147483646,
            cursor: "move",
            userSelect: "none",
          }}
          onMouseDown={onMouseDownRemote}
          onTouchStart={onTouchStartRemote}
          onTouchMove={onTouchMoveRemote}
          onTouchEnd={onTouchEndRemote}
        >
          <div
            className="header"
            style={{
              height: 24,
              backgroundColor: "#111",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              color: "#0f0",
              fontWeight: "bold",
              fontSize: 12,
              lineHeight: "24px",
              paddingLeft: 10,
              userSelect: "none",
            }}
          >
            Vídeo Remoto
          </div>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "calc(100% - 24px)",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              backgroundColor: "#000",
            }}
          />
        </div>
      )}

      {/* VÍDEO LOCAL FLUTUANTE */}
      {cameraOn && (
        <div
          ref={localBoxRef}
          className="video-box"
          style={{
            position: "fixed",
            top: 400,
            left: 300,
            width: 160,
            height: 120,
            backgroundColor: "#000",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.75)",
            zIndex: 2147483647,
            cursor: "move",
            userSelect: "none",
          }}
          onMouseDown={onMouseDownLocal}
          onTouchStart={onTouchStartLocal}
          onTouchMove={onTouchMoveLocal}
          onTouchEnd={onTouchEndLocal}
        >
          <div
            className="header"
            style={{
              height: 24,
              backgroundColor: "#111",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              color: "#0f0",
              fontWeight: "bold",
              fontSize: 12,
              lineHeight: "24px",
              paddingLeft: 10,
              userSelect: "none",
            }}
          >
            Seu Vídeo
          </div>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              height: "calc(100% - 24px)",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              backgroundColor: "#000",
            }}
          />
        </div>
      )}
    </>
  );
}
