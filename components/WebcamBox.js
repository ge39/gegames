import { useEffect, useRef, useState } from "react";

export default function WebcamBox() {
  const videoRef = useRef(null);
  const [cameraAtiva, setCameraAtiva] = useState(true);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const ativarCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Erro ao acessar webcam:", err);
        setCameraAtiva(false);
      }
    };

    ativarCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleCamera = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setCameraAtiva(videoTrack.enabled);
  };

  return (
    <div style={{
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
      background: "rgba(0,0,0,0.5)",
      borderRadius: "8px",
      padding: "5px"
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={160}
        height={120}
        style={{ border: "2px solid #fff", borderRadius: "4px" }}
      />
      <button onClick={toggleCamera} style={{ display: "block", marginTop: 5 }}>
        {cameraAtiva ? "Desligar Webcam" : "Ligar Webcam"}
      </button>
    </div>
  );
}

