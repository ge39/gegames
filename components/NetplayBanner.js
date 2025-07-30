import Link from 'next/link';
import {  Camera } from 'lucide-react';

export default function NetplayBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-xl shadow-xl flex items-center justify-between animate-pulse mb-6">
      <div className="flex items-center gap-4">
        <Camera className="w-10 h-10 animate-bounce" />
        <div>
          <h2 className="text-lg font-extrabold uppercase">Jogue com Webcam!</h2>
          <p className="text-sm font-medium">Desafie seus amigos como no fliperama dos anos 90 🎮</p>
        </div>
      </div>
      <Link
        href="/como-jogar"
        className="bg-black text-yellow-400 px-4 py-2 rounded-lg font-bold hover:bg-gray-900 hover:scale-105 transition"
      >
        Ver como funciona
      </Link>
    </div>
  );
}

