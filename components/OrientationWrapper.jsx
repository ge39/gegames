'use client';
import { useEffect, useState } from 'react';

export default function OrientationWrapper({ children }) {
  const [rotation, setRotation] = useState({ beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const handleOrientation = (event) => {
      let { beta, gamma } = event;

      // Garante que valores sejam válidos
      if (beta === null || gamma === null) return;

      // Limites suaves (entre -15 e +15 graus)
      beta = Math.max(-15, Math.min(15, beta));
      gamma = Math.max(-15, Math.min(15, gamma));

      setRotation({ beta, gamma });
    };

    // iOS requer permissão explícita
    const enableOrientation = async () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch (error) {
          console.warn('Permissão negada para giroscópio:', error);
        }
      } else {
        // Android ou navegadores sem bloqueio
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };

    enableOrientation();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const style = {
    transform: `rotateX(${rotation.beta}deg) rotateY(${rotation.gamma}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.2s ease-out',
    willChange: 'transform',
    minHeight: '100vh',
    overflow: 'hidden',
  };

  return <div style={style}>{children}</div>;
}
