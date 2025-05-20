import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerWebcam({ sala }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [callActive, setCallActive] = useState(false);
  const [peerInstance, setPeerInstance] = useState(null);

  useEffect(() => {
    if (!sala) return;

    const peer = new Peer(`sala-${sala}`, {
      debug: 2,
    });

    setPeerInstance(peer);

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            setCallActive(true);
          }
        });
      });

      // Tenta conectar com o outro jogador (assumindo apenas 2 jogadores)
      const otherPeerId = `sala-${sala}`;
      if (peer.id !== otherPeerId) {
        const call = peer.call(otherPeerId, stream);
        call?.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            setCallActive(true);
          }
        });
      }
    });

    return () => {
      peer?.destroy();
    };
  }, [sala]);

  return (
    <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 9999 }}>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "120px", height: "90px", borderRadius: "8px", marginBottom: "0.5rem" }}
      />
      {callActive && (
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "120px", height: "90px", borderRadius: "8px" }}
        />
      )}
    </div>
  );
}
