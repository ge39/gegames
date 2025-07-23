"use client";
import { useState, useEffect } from "react";


export const adultGames = [
  {
    id: "1",
    path: "fliperama/adulto/fantasia.zip",
    core: "arcade",   
    bios: "",
    name: "FANTASIA",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/fantasia-thumb.webp",
    alt: "Fantasia Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
  // {
  //   id: "2",
  //   path: "fliperama/adulto/galpani4.zip",
  //   core: "arcade",
  //   bios: "",
  //   name: "GALPANI4",
  //   desc: "Descrição não disponível.",
  //   image: "/images/games/arcade/adulto/galpani4-thumb.webp",
  //   alt: "Galpani4 Cover Art",
  //   players: "1-2",
  //   releasedate: "199X-01-01",
  // },
  {
    id: "3",
    path: "fliperama/adulto/galpanic.zip",
    core: "arcade",
    bios: "",
    name: "GALPANIC",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/galpanic-thumb.webp",
    alt: "Galpanic Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
  {
    id: "4",
    path: "fliperama/adulto/galpanis.zip",
    core: "arcade",
    bios: "",
    name: "GALPANIS",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/galpanis-thumb.webp",
    alt: "Galpanis Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
  {
    id: "5",
    path: "fliperama/adulto/galpans2.zip",
    core: "arcade",
    bios: "",
    name: "GALPANS2",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/galpans2-thumb.webp",
    alt: "Galpans2 Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
  {
    id: "6",
    path: "fliperama/adulto/galpans3.zip",
    core: "arcade",
    bios: "",
    name: "GALPANS3",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/galpans3-thumb.webp",
    alt: "Galpans3 Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
  {
    id: "7",
    path: "fliperama/adulto/galspnbl.zip",
    core: "arcade",
    bios: "",
    name: "GALSPNBL",
    desc: "Descrição não disponível.",
    image: "/images/games/arcade/adulto/galspnbl-thumb.webp",
    alt: "Galspnbl Cover Art",
    players: "1-2",
    releasedate: "199X-01-01",
  },
];

export default function AdultGamesSection() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Verifica se o acesso já foi liberado na sessão
    const access = sessionStorage.getItem("adultGamesAccess");
    if (access === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleClick = () => {
    const today = new Date().getDate();
    const correctPassword = (today + 2).toString();
    const input = prompt("🔒 Digite a senha para acessar os jogos adultos:");

    if (input === correctPassword) {
      sessionStorage.setItem("adultGamesAccess", "true");
      setIsAuthorized(true);
    } else {
      alert("❌ Senha incorreta!");
    }
  };

  return (
    <div className="my-8 p-4 border rounded bg-gray-50 shadow-md">
      <h2
        onClick={handleClick}
        className="text-2xl font-bold text-red-600 cursor-pointer hover:underline"
      >
        🔞 Jogos Adultos (Clique para desbloquear)
      </h2>

      {isAuthorized && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {adultGames.map((game) => (
            <div
              key={game.id}
              className="border rounded p-2 bg-white shadow hover:shadow-lg transition"
            >
              <img
                src={game.image}
                alt={game.alt}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{game.name}</h3>
              <p className="text-sm text-gray-600">{game.desc}</p>
              <p className="text-xs mt-1 text-gray-500">
                Jogadores: {game.players}
              </p>
              <p className="text-xs text-gray-500">
                Lançamento: {game.releasedate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
