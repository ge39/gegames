import { useEffect, useRef, useState } from "react";

export default function WebcamBox() {
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (visivel && !stream) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          setCameraAtiva(true);
        })
        .catch((err) => {
          console.error("Erro ao acessar webcam:", err);
          setCameraAtiva(false);
          setVisivel(false);
        });
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [visivel]);

  const toggleCamera = () => {
    if (cameraAtiva) {
      // Desliga a câmera e oculta a janela
      stream?.getTracks().forEach((track) => track.stop());
      setCameraAtiva(false);
      setVisivel(false);
      setStream(null);
    } else {
      // Reativa a janela e a câmera
      setVisivel(true);
    }
  };

  // Drag para mover
  useEffect(() => {
    const box = boxRef.current;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - box.offsetLeft;
      offsetY = e.clientY - box.offsetTop;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        box.style.left = `${e.clientX - offsetX}px`;
        box.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    if (box) {
      box.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (box) box.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [visivel]);

  return (
    <>
      <button
        onClick={toggleCamera}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 20,
          padding: "6px 12px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {cameraAtiva ? "Desligar Webcam" : "Ligar Webcam"}
      </button>

      {visivel && (
        <div
          ref={boxRef}
          style={{
            position: "absolute",
            top: 60,
            right: 10,
            width: 160,
            height: 120,
            zIndex: 10,
            background: "rgba(0,0,0,0.6)",
            borderRadius: "8px",
            cursor: "move",
            padding: "5px",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            width="100%"
            height="100%"
            style={{ borderRadius: "4px", border: "2px solid #fff" }}
          />
        </div>
      )}
    </>
  );
}
