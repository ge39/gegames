"use client";
import { useState } from "react";
import Image from "next/image";
import { adultGames } from "../data/adultGames";

export default function AdultGamesSection() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleClick = () => {
    const today = new Date().getDate();
    const correctPassword = (today + 2).toString();
    const input = prompt("🔒 Digite a senha para acessar os jogos adultos:");

    if (input === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert("❌ Senha incorreta!");
    }
  };

  return (
    <div className="my-8 p-4 border rounded bg-gray-50 shadow-md max-w-[1100px] mx-auto">
      <h2
        onClick={handleClick}
        className="text-2xl font-bold text-red-600 cursor-pointer hover:underline select-none text-center"
      >
        🔞 Jogos Adultos (Clique para desbloquear)
      </h2>

      {isAuthorized && (
        <div className="grid grid-cols-4 gap-4 mt-6">
          {adultGames.map((game) => (
            <div
              key={game.id}
              className="border rounded p-2 bg-white shadow hover:shadow-lg transition"
            >
              <a
                href={`/emulation?jogo=${encodeURIComponent(
                  game.path
                )}&core=${encodeURIComponent(game.core)}`}
                className="block text-center"
              >
                <Image
                  src={game.image}
                  alt={game.alt}
                  width={200}
                  height={200}
                  className="rounded object-cover"
                  priority
                />
                <h3 className="mt-2 font-semibold">{game.name}</h3>
                <p className="text-xs mt-1 text-gray-500">
                  Jogadores: {game.players}
                </p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
