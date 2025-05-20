import { useEffect, useRef, useState } from "react";

export default function WebcamBox() {
  const videoRef = useRef(null);
  const boxRef = useRef(null);
  const resizeHandleRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [visivel, setVisivel] = useState(true);
  const [boxStyle, setBoxStyle] = useState({
    top: 60,
    left: window.innerWidth - 180,
    width: 160,
    height: 120,
  });

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
      stream?.getTracks().forEach((track) => track.stop());
      setCameraAtiva(false);
      setVisivel(false);
      setStream(null);
    } else {
      setVisivel(true);
    }
  };

  useEffect(() => {
    const box = boxRef.current;
    const resizeHandle = resizeHandleRef.current;

    let startX, startY, startWidth, startHeight, offsetX, offsetY;
    let isDragging = false;
    let isResizing = false;

    const onMouseDownDrag = (e) => {
      if (e.target === resizeHandle) return;
      isDragging = true;
      startX = e.clientX || e.touches?.[0]?.clientX;
      startY = e.clientY || e.touches?.[0]?.clientY;
      offsetX = startX - box.offsetLeft;
      offsetY = startY - box.offsetTop;
      e.preventDefault();
    };

    const onMouseDownResize = (e) => {
      isResizing = true;
      startX = e.clientX || e.touches?.[0]?.clientX;
      startY = e.clientY || e.touches?.[0]?.clientY;
      startWidth = box.offsetWidth;
      startHeight = box.offsetHeight;
      e.stopPropagation();
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      const x = e.clientX || e.touches?.[0]?.clientX;
      const y = e.clientY || e.touches?.[0]?.clientY;

      if (isDragging) {
        setBoxStyle((prev) => ({
          ...prev,
          left: x - offsetX,
          top: y - offsetY,
        }));
      }

      if (isResizing) {
        const newWidth = Math.max(100, startWidth + (x - startX));
        const newHeight = Math.max(75, startHeight + (y - startY));
        setBoxStyle((prev) => ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }));
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      isResizing = false;
    };

    box.addEventListener("mousedown", onMouseDownDrag);
    box.addEventListener("touchstart", onMouseDownDrag, { passive: false });
    resizeHandle.addEventListener("mousedown", onMouseDownResize);
    resizeHandle.addEventListener("touchstart", onMouseDownResize, { passive: false });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", onMouseUp);

    return () => {
      box.removeEventListener("mousedown", onMouseDownDrag);
      box.removeEventListener("touchstart", onMouseDownDrag);
      resizeHandle.removeEventListener("mousedown", onMouseDownResize);
      resizeHandle.removeEventListener("touchstart", onMouseDownResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
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
          zIndex: 9999,
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
            ...boxStyle,
            zIndex: 9998,
            background: "#000",
            border: "2px solid #fff",
            borderRadius: "8px",
            overflow: "hidden",
            touchAction: "none"
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          <div
            ref={resizeHandleRef}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 20,
              height: 20,
              background: "#fff",
              borderTopLeftRadius: "5px",
              cursor: "nwse-resize",
              zIndex: 9999,
            }}
          />
        </div>
      )}
    </>
  );
}
