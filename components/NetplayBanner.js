// components/NetplayBanner.js
import Image from 'next/image';
import Link from 'next/link';

export default function NetplayBanner() {
  return (
    <div style={{
      background: 'linear-gradient(to right, #1f1c2c, #928dab)',
      color: '#fff',
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '16px',
      margin: '2rem auto',
      maxWidth: '900px',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      fontFamily: '"Press Start 2P", cursive',
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        🎮 Jogue Clássicos Retrô Online
      </h2>

      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Com <strong>webcam</strong>, <strong>chat</strong> e <strong>salas multiplayer</strong> ao vivo!
      </p>

      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
         <strong>DESAFIE SEU AMIGO A UM DUELO</strong> ONLINE!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Image src="/logo/controller.png" alt="Controle retrô" width={50} height={50} />
        <Image src="/logo/webcam.png" alt="Webcam" width={50} height={50} />
        <Image src="/logo/chat.png" alt="Chat" width={50} height={50} />
      </div>

      <Link href="/como-jogar">
        <button style={{
          backgroundColor: '#ffcc00',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}>
         🚀 Saiba como jogar
        </button>
      </Link>
         
    </div>
  );
}
