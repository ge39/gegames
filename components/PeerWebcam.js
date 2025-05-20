import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export default function PeerWebcam({ sala }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peer, setPeer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const localBoxRef = useRef(null);
  const remoteBoxRef = useRef(null);

  useEffect(() => {
    const peerInstance = new Peer(`sala-${sala}`, {
      host: "peerjs.com",
      secure: true,
      port: 443,
    });

    setPeer(peerInstance);

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peerInstance.on("open", id => {
          console.log("Conectado como:", id);
        });

        peerInstance.on("call", call => {
          call.answer(stream);
          call.on("stream", remoteStream => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              setCallActive(true);
            }
          });
        });

        // Tenta se conectar com o outro jogador
        const otherPeerId = `sala-${sala}`;
        if (peerInstance.id !== otherPeerId) {
          const call = peerInstance.call(otherPeerId, stream);
          call?.on("stream", remoteStream => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              setCallActive(true);
            }
          });
        }
      })
      .catch(err => console.error("Erro ao acessar webcam:", err));

    return () => {
      peerInstance.destroy();
    };
  }, [sala]);

  useEffect(() => {
    if (localBoxRef.current) makeDraggable(localBoxRef);
    if (remoteBoxRef.current) makeDraggable(remoteBoxRef);
  }, []);

  const makeDraggable = (ref) => {
    let posX = 0, posY = 0, initialX = 0, initialY = 0;

    const dragMouseDown = (e) => {
      e.preventDefault();
      const touch = e.touches ? e.touches[0] : e;
      initialX = touch.clientX;
      initialY = touch.clientY;

      document.addEventListener("mousemove", elementDrag);
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("touchmove", elementDrag);
      document.addEventListener("touchend", closeDragElement);
    };

    const elementDrag = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      posX = touch.clientX - initialX;
      posY = touch.clientY - initialY;
      initialX = touch.clientX;
      initialY = touch.clientY;

      ref.current.style.top = (ref.current.offsetTop + posY) + "px";
      ref.current.style.left = (ref.current.offsetLeft + posX) + "px";
    };

    const closeDragElement = () => {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
      document.removeEventListener("touchend", closeDragElement);
      document.removeEventListener("touchmove", elementDrag);
    };

    ref.current.addEventListener("mousedown", dragMouseDown);
    ref.current.addEventListener
