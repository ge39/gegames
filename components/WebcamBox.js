import { useEffect, useRef, useState } from "react";

export default function WebcamBox() {
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [visivel, setVisivel] = useState(true);
  const [boxStyle, setBoxStyle] = useState({
    top: 88,
    left: 0,
    width: 140,
    height: 120,
  });

  // Define a posição inicial no canto superior direito
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBoxStyle((prev) => ({
        ...prev,
        left: window.innerWidth - 180,
      }));
    }
  }, []);

  // Inicializa a webcam
  useEffect(() => {
    if (cameraAtiva && !stream) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
          setStream(mediaStream);
          setVisivel(true);
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
  }, [cameraAtiva]);

  const toggleCamera = () => {
    if (cameraAtiva) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      setCameraAtiva(false);
      setTimeout(() => setVisivel(false), 100);
    } else {
      setCameraAtiva(true);
    }
  };

  // Drag e Resize
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let startX, startY, startWidth, startHeight, offsetX, offsetY;
    let isDragging = false;
    let isResizing = false;

    const handleStart = (e) => {
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

    const handleMove = (e) => {
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

    const handleEnd = () => {
      isDragging = false;
      isResizing = false;
    };

    box.addEventListener("mousedown", handleStart);
    box.addEventListener("touchstart", handleStart, { passive: false });
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      box.removeEventListener("mousedown", handleStart);
      box.removeEventListener("touchstart", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
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
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          transition: "all 0.2s",
        }}
      >
        {cameraAtiva ? "Desligar Webcam" : "Ligar Webcam"}
      </button>

      {visivel && (
        <div
          ref={boxRef}
          style={{
            position: "fixed",
            top: boxStyle.top,
            left: boxStyle.left,
            width: boxStyle.width,
            height: boxStyle.height,
            zIndex: 2147483647,
            background: "#000",
            border: "2px solid #fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            touchAction: "none",
            userSelect: "none",
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
