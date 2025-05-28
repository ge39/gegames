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

  useEffect(() => {
    const storedPosition = JSON.parse(localStorage.getItem("boxPosition"));
    if (storedPosition && boxRef.current) {
      boxRef.current.style.left = `${storedPosition.left}px`;
      boxRef.current.style.top = `${storedPosition.top}px`;
    }
  }, []);

  const saveBoxPosition = () => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    localStorage.setItem(
      "boxPosition",
      JSON.stringify({ left: rect.left, top: rect.top })
    );
  };

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
    saveBoxPosition();
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
    saveBoxPosition();
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
        top: 88,
        left: 10,
        zIndex: 999999,
        width: 140,
        maxWidth: "95vw",
        background: "#12151a",
        color: "#e1e1e1",
        borderRadius: 10,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.75)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {/* ... o restante do componente permanece igual ... */}
    </div>
  );
}
