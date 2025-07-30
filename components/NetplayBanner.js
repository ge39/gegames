// components/NetplayBanner.js
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function NetplayBanner() {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
      <div className="flex items-center gap-4">
        <Gamepad2 size={48} className="text-white drop-shadow-lg" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md">
            Jogue Clássicos Retrô Online!
          </h2>
          <p className="text-sm md:text-base mt-1 text-white/90">
            Desafie seus amigos nos maiores sucessos dos anos 80, 90 e 2000 com webcam!
          </p>
        </div>
      </div>
      <Link href="/como-jogar">
        <span className="bg-black hover:bg-white hover:text-black text-yellow-300 border border-white px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 shadow-md">
          Veja como jogar
        </span>
      </Link>
    </div>
  );
}
