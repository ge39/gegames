import { useEffect, useState } from "react";

export default function OrientationWrapper({ children }) {
  const [rotation, setRotation] = useState({ beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  useEffect(() => {
    // Verifica se precisa pedir permissão (iOS 13+)
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setNeedsPermission(true);
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    function handleOrientation(event) {
      const { beta, gamma } = event;
      setRotation({ beta, gamma });
    }

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [permissionGranted]);

  async function requestPermission() {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
          setNeedsPermission(false);
        } else {
          alert("Permissão para giroscópio negada.");
        }
      } catch (err) {
        alert("Erro ao solicitar permissão para giroscópio.");
      }
    }
  }

  const style = {
    transform: `rotateX(${rotation.beta}deg) rotateY(${rotation.gamma}deg)`,
    transformStyle: "preserve-3d",
    transition: "transform 0.1s ease-out",
    willChange: "transform",
    height: "100vh",
  };

  if (needsPermission && !permissionGranted) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#111",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: 20,
          textAlign: "center",
        }}
      >
        <p>Para usar a orientação do dispositivo, por favor permita o acesso ao giroscópio.</p>
        <button
          onClick={requestPermission}
          style={{
            marginTop: 20,
            padding: "12px 24px",
            fontSize: 16,
            cursor: "pointer",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
          }}
        >
          Permitir Acesso
        </button>
      </div>
    );
  }

  return <div style={style}>{children}</div>;
}

