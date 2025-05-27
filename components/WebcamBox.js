import { useEffect, useRef, useState } from "react";

export default function WebcamBox() {
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [visivel, setVisivel] = useState(true);
  const [boxStyle, setBoxStyle] = useState({
    bottom:510,
    right: 10, // será atualizado no useEffect
    width: 140,
    height: 120,
  });

  // Corrige posição inicial do vídeo no canto superior direito
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBoxStyle((prev) => ({
        ...prev,
        left: window.innerWidth - 180,
      }));
    }
  }, []);

  // Inicializa webcam quando visível
  useEffect(() => {
    if (visivel && !stream) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setStream(mediaStream);
          setCameraAtiva(true);
        })
        .catch((err) => {
          console.error("Erro ao acessar a webcam:", err);
          setCameraAtiva(false);
          setVisivel(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [visivel]);

  const toggleCamera = () => {
    if (cameraAtiva) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      setCameraAtiva(false);
      setVisivel(false);
    } else {
      setVisivel(true);
    }
  };

  // Drag e Resize
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let startX, startY, startWidth, startHeight, offsetX, offsetY;
    let isDragging = false;
    let isResizing = false;

    const handleTouchOrMouseStart = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const target = e.target;

      if (target.classList.contains("resize-handle")) {
        isResizing = true;
        startX = clientX;
        startY = clientY;
        startWidth = box.offsetWidth;
        startHeight = box.offsetHeight;
      } else {
        isDragging = true;
        offsetX = clientX - box.offsetLeft;
        offsetY = clientY - box.offsetTop;
      }

      e.preventDefault();
    };

    const handleTouchOrMouseMove = (e) => {
      if (!isDragging && !isResizing) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        setBoxStyle((prev) => ({
          ...prev,
          left: clientX - offsetX,
          top: clientY - offsetY,
        }));
      }

      if (isResizing) {
        const newWidth = Math.max(100, startWidth + (clientX - startX));
        const newHeight = Math.max(75, startHeight + (clientY - startY));
        setBoxStyle((prev) => ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }));
      }
    };

    const handleTouchOrMouseEnd = () => {
      isDragging = false;
      isResizing = false;
    };

    box.addEventListener("mousedown", handleTouchOrMouseStart);
    box.addEventListener("touchstart", handleTouchOrMouseStart, { passive: false });
    window.addEventListener("mousemove", handleTouchOrMouseMove);
    window.addEventListener("touchmove", handleTouchOrMouseMove, { passive: false });
    window.addEventListener("mouseup", handleTouchOrMouseEnd);
    window.addEventListener("touchend", handleTouchOrMouseEnd);

    return () => {
      box.removeEventListener("mousedown", handleTouchOrMouseStart);
      box.removeEventListener("touchstart", handleTouchOrMouseStart);
      window.removeEventListener("mousemove", handleTouchOrMouseMove);
      window.removeEventListener("touchmove", handleTouchOrMouseMove);
      window.removeEventListener("mouseup", handleTouchOrMouseEnd);
      window.removeEventListener("touchend", handleTouchOrMouseEnd);
    };
  }, [visivel]);

  return (
    <>
      <button
        onClick={toggleCamera}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2147483647,
          padding: "6px 12px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {cameraAtiva ? "Desligar Webcam" : "Ligar Webcam"}
      </button>

      {visivel && (
        <div
          ref={boxRef}
          style={{
            position: "fixed",
            top: boxStyle.bottom,
            left: boxStyle.right,
            width: boxStyle.width,
            height: boxStyle.height,
            zIndex: 2147483647,
            background: "#000",
            border: "2px solid #fff",
            borderRadius: "8px",
            overflow: "hidden",
            touchAction: "none",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="resize-handle"
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              bottom: 0,
              right: 0,
              background: "#fff",
              cursor: "nwse-resize",
              zIndex: 2147483647,
              borderTopLeftRadius: "6px",
            }}
          />
        </div>
      )}
    </>
  );
}
