import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);

  // Ref para a div arrastável
  const dragRef = useRef(null);

  // Estado para posição da janela
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const posRef = useRef(pos);
  posRef.current = pos;

  // Inicializa PeerJS
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
      } catch (err) {
        alert("Erro ao acessar câmera: " + err.message);
      }
    });

    return () => peer.destroy();
  }, [cameraOn]);

  // Drag handlers
  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    let startX, startY, dragging = false;

    const onMouseDown = (e) => {
      dragging = true;
      startX = e.clientX - posRef.current.x;
      startY = e.clientY - posRef.current.y;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      setPos({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      dragging = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    // Vamos permitir arrastar clicando na própria div toda
    element.addEventListener("mousedown", onMouseDown);

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Liga/desliga câmera
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
        alert("Erro ao acessar câmera: " + err.message);
      }
    }
  };

  // Conectar
  const connectToPeer = () => {
    if (!cameraOn) {
      alert("Ligue a câmera antes de conectar.");
      return;
    }
    if (!peerRef.current || !localStreamRef.current) {
      alert("PeerJS não inicializado ou câmera não ativa.");
      return;
    }
    const call = peerRef.current.call(remoteId, localStreamRef.current);
    if (!call) {
      alert("Erro ao tentar iniciar a chamada. Verifique o ID.");
      return;
    }
    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
      setConnected(true);
    });
    call.on("error", (err) => {
      console.error("Erro na chamada:", err);
      alert("Erro durante a chamada: " + err.message);
    });
    call.on("close", () => {
      setConnected(false);
      remoteVideoRef.current.srcObject = null;
    });
    callRef.current = call;
  };

  // Desconectar
  const disconnect = () => {
    callRef.current?.close();
    callRef.current = null;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;

    setConnected(false);
    setCameraOn(false);
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        zIndex: 9999,
        width: 180,
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        padding: 10,
        fontFamily: "sans-serif",
        fontSize: 12,
        boxShadow: "0 6px 12px rgba(0,0,0,0.5)",
        userSelect: "none",
        cursor: "grab",
      }}
      title="Arraste para mover"
    >
      <div>
        <strong>ID:</strong>
        <div style={{ fontSize: 10, wordWrap: "break-word" }}>{myPeerId || "gerando..."}</div>
        {myPeerId && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(myPeerId);
              alert("ID copiado!");
            }}
            style={{
              fontSize: 10,
              marginTop: 4,
              color: "#0af",
              background: "none",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Copiar ID
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          marginTop: 6,
          justifyContent: "center",
        }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          width={80}
          height={60}
          style={{ borderRadius: 4, border: "1px solid #333", opacity: cameraOn ? 1 : 0.4 }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          width={80}
          height={60}
          style={{ borderRadius: 4, border: "1px solid #333" }}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label htmlFor="remoteId">ID do amigo:</label>
        <input
          id="remoteId"
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          style={{
            width: "100%",
            marginTop: 4,
            padding: 4,
            fontSize: 11,
            borderRadius: 4,
            border: "1px solid #444",
            background: "#222",
            color: "#fff",
          }}
        />
      </div>

      <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
        <button
          onClick={toggleCamera}
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
          onClick={connectToPeer}
          style={{
            flex: 1,
            fontSize: 11,
            background: "#06c",
            color: "#fff",
            border: "none",
            padding: 4,
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Conectar
        </button>
      </div>

      {connected && (
        <button
          onClick={disconnect}
          style={{
            marginTop: 6,
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
