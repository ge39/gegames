import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerConnection() {
  const [myPeerId, setMyPeerId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 80 });

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const localStreamRef = useRef(null);
  const containerRef = useRef(null);

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
      } catch (error) {
        alert("Erro ao acessar a câmera: " + error.message);
      }
    });

    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (e) => {
      offsetX = e.clientX - position.x;
      offsetY = e.clientY - position.y;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, [position]);

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
      ref={containerRef}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 9999,
        width: "170px",
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 6px 12px rgba(0,0,0,0.6)",
        fontFamily: "sans-serif",
        padding: 8,
        fontSize: 12,
        cursor: "move",
        userSelect: "none",
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <strong>ID:</strong>
        <div style={{ wordWrap: "break-word", fontSize: 10 }}>{myPeerId || "gerando..."}</div>
        {myPeerId && (
          <button
            onClick={() => {
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

      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          width={68}
          height={51}
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
          width={68}
          height={51}
          style={{
            background: "#000",
            borderRadius: 4,
            border: "1px solid #333",
          }}
        />
      </div>

      <div style={{ marginTop: 8, display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>ID do amigo:</label>
        <input
          type="text"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          placeholder="Digite o ID"
          style={{
            padding: "5px 6px",
            fontSize: 10,
            borderRadius: 5,
            border: "1px solid #444",
            background: "#2c2c3d",
            color: "#eee",
          }}
        />
      </div>

      <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
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
          onClick={disconnect}
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
