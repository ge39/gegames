
// components/PeerWebcam.js
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerWebcam({ sala }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localBoxRef = useRef(null);
  const remoteBoxRef = useRef(null);
  const [peerId, setPeerId] = useState(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
      const outroId = sala + "-1" === id ? sala + "-2" : sala + "-1";
      if (id !== outroId) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          localVideoRef.current.srcObject = stream;
          const call = peer.call(outroId, stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });
      }
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        localVideoRef.current.srcObject = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    return () => peer.destroy();
  }, [sala]);

  // Função para tornar a div arrastável
  const makeDraggable = (ref) => {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const startDrag = (e) => {
      isDragging = true;
      const touch = e.touches ? e.touches[0] : e;
      offsetX = touch.clientX - ref.current.getBoundingClientRect().left;
      offsetY = touch.clientY - ref.current.getBoundingClientRect().top;
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", drag, { passive: false });
      document.addEventListener("touchend", endDrag);
    };

    const drag = (e) => {
      if (!isDragging) return;
      const touch = e.touches ? e.touches[0] : e;
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;
      ref.current.style.left = `${x}px`;
      ref.current.style.top = `${y}px`;
    };

    const endDrag = () => {
      isDragging = false;
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", endDrag);
    };

    ref.current.addEventListener("mousedown", startDrag);
    ref.current.addEventListener("touchstart", startDrag, { passive: false });
  };

  useEffect(() => {
    if (localBoxRef.current) makeDraggable(localBoxRef);
    if (remoteBoxRef.current) makeDraggable(remoteBoxRef);
  }, []);

  return (
    <>
      <div
        ref={localBoxRef}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "160px",
          height: "120px",
          zIndex: 1000,
          border: "2px solid lime",
          borderRadius: "8px",
          overflow: "hidden",
          touchAction: "none",
          background: "#000",
        }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        ref={remoteBoxRef}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          width: "160px",
          height: "120px",
          zIndex: 1000,
          border: "2px solid red",
          borderRadius: "8px",
          overflow: "hidden",
          touchAction: "none",
          background: "#000",
        }}
      >
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </>
  );
}
