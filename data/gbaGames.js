"use client";
import { useState, useEffect } from "react";

export const gbaGames = [
  {
    "id": "4",
    "name": "Advance Wars",
    "path": "gba/Advance Wars.gba",
    "core": "gba",
    "desc": "Jogo de estratégia militar baseado em turnos com gráficos coloridos e profundidade tática.",
    "image": "/images/games/gba/Advance Wars.webp",
    "rating": "0.90",
    "players": "2",
    "releasedate": "2001-09-10"
  },
  {
    "id": "19",
    "name": "Boktai: The Sun Is in Your Hand",
    "path": "gba/Boktai - The Sun is in Your Hand.gba",
    "core": "gba",
    "desc": "Jogo de ação com sensor solar real para derrotar vampiros com luz do sol.",
    "image": "/images/games/gba/Boktai - The Sun Is in Your Hand.webp",
    "rating": "0.87",
    "players": "1",
    "releasedate": "2003-09-16"
  },
  {
    "id": "3",
    "name": "Castlevania: Aria of Sorrow",
    "path": "gba/Castlevania - Aria of Sorrow.gba",
    "core": "gba",
    "desc": "Em um futuro distante, Soma Cruz explora o castelo de Drácula com poderes absorvíveis.",
    "image": "/images/games/gba/Castlevania - Aria of Sorrow.webp",
    "rating": "0.91",
    "players": "1",
    "releasedate": "2003-05-06"
  },
  {
    "id": "14",
    "name": "Donkey Kong Country",
    "path": "gba/Donkey Kong Country.gba",
    "core": "gba",
    "desc": "Plataforma clássico com gráficos pré-renderizados e trilha sonora marcante.",
    "image": "/images/games/gba/Donkey Kong Country.webp",
    "rating": "0.89",
    "players": "1",
    "releasedate": "2003-06-09"
  },
  // {
  //   "id": "5",
  //   "name": "Fire Emblem",
  //   "path": "gba/Fire Emblem.gba",
  //   "core": "gba",
  //   "desc": "RPG tático com batalhas épicas e personagens carismáticos, em sua estreia no ocidente.",
  //   "image": "/images/games/gba/Fire Emblem-thumb.webp",
  //   "rating": "0.89",
  //   "players": "1",
  //   "releasedate": "2003-11-03"
  // },
  {
    "id": "11",
    "name": "Final Fantasy Tactics Advance",
    "path": "gba/Final Fantasy Tactics Advance (Europe).gba",
    "core": "gba",
    "desc": "Um RPG tático com sistema de leis, classes e batalhas por turnos.",
    "image": "/images/games/gba/Final Fantasy Tactics Advance (Europe).webp",
    "rating": "0.91",
    "players": "1",
    "releasedate": "2003-09-08"
  },
  {
    "id": "12",
    "name": "Golden Sun",
    "path": "gba/Golden Sun.gba",
    "core": "gba",
    "desc": "RPG com belos gráficos e sistema de Djinn para magias e invocações.",
    "image": "/images/games/gba/Golden Sun.webp",
    "rating": "0.90",
    "players": "1",
    "releasedate": "2001-11-11"
  },
  {
    "id": "15",
    "name": "Kirby & the Amazing Mirror",
    "path": "gba/Kirby & the Amazing Mirror.gba",
    "core": "gba",
    "desc": "Remake de Kirby's Adventure com gráficos atualizados e jogabilidade fluida.",
    "image": "/images/games/gba/Kirby & the Amazing Mirror.webp",
    "rating": "0.88",
    "players": "2",
    "releasedate": "2002-12-02"
  },
  {
    "id": "13",
    "name": "Mario & Luigi: Superstar Saga",
    "path": "gba/Mario & Luigi - Superstar Saga.gba",
    "core": "gba",
    "desc": "Mario e Luigi embarcam em uma aventura hilária com combate por turnos dinâmico.",
    "image": "/images/games/gba/Mario & Luigi - Superstar Saga.webp",
    "rating": "0.91",
    "players": "1",
    "releasedate": "2003-11-17"
  },
  {
    "id": "8",
    "name": "Lilo & Stitch",
    "path": "gba/Lilo & Stitch.gba",
    "core": "gba",
    "desc": "Corridas com Mario e seus amigos em pistas clássicas e originais com multijogador local.",
    "image": "/images/games/gba/Lilo & Stitch.webp",
    "rating": "0.88",
    "players": "4",
    "releasedate": "2001-08-27"
  },
  {
    "id": "17",
    "name": "Mega Man Zero",
    "path": "gba/Mega Man Zero.gba",
    "core": "gba",
    "desc": "Jogo de ação desafiador com o lendário herói Zero em destaque.",
    "image": "/images/games/gba/Mega Man Zero.webp",
    "rating": "0.89",
    "players": "1",
    "releasedate": "2002-09-10"
  },
  {
    "id": "2",
    "name": "Metroid Fusion",
    "path": "gba/Metroid Fusion.gba",
    "core": "gba",
    "desc": "Samus investiga uma estação infestada por parasitas X enquanto enfrenta sua versão infectada.",
    "image": "/images/games/gba/Metroid Fusion.webp",
    "rating": "0.93",
    "players": "1",
    "releasedate": "2002-11-17"
  },
  {
    "id": "16",
    "name": "Mother 3",
    "path": "gba/Mother 3.gba",
    "core": "gba",
    "desc": "Sequência espiritual de EarthBound com uma história tocante e sistema de batalha musical.",
    "image": "/images/games/gba/Mother 3.webp",
    "rating": "0.96",
    "players": "1",
    "releasedate": "2006-04-20"
  },
  {
    "id": "20",
    "name": "Ninja Five-0",
    "path": "gba/Ninja Five-0.gba",
    "core": "gba",
    "desc": "Ação rápida com um ninja policial enfrentando terroristas com sua katana e gancho.",
    "image": "/images/games/gba/Ninja Five-0.webp",
    "rating": "0.88",
    "players": "1",
    "releasedate": "2003-04-22"
  },
  {
    "id": "6",
    "name": "Pokémon Emerald",
    "path": "gba/Pokemon - Emerald Version.gba",
    "core": "gba",
    "desc": "Explore Hoenn, capture Pokémon e derrote a Equipe Aqua e Magma em uma jornada definitiva.",
    "image": "/images/games/gba/Pokemon - Emerald Version.webp",
    "rating": "0.95",
    "players": "2",
    "releasedate": "2005-05-01"
  },
  {
    "id": "7",
    "name": "Pokémon FireRed",
    "path": "gba/Pokemon-Fire-Red.gba",
    "core": "gba",
    "desc": "Remake do clássico original com gráficos atualizados e melhorias na jogabilidade.",
    "image": "/images/games/gba/Pokemon - Fire Red Version (Rev 1).webp",
    "rating": "0.93",
    "players": "2",
    "releasedate": "2004-09-09"
  },
  {
    "id": "21",
    "name": "Pokémon LeafGreen",
    "path": "gba/Pokemon - Leaf Green Version.gba",
    "core": "gba",
    "desc": "Versão aprimorada do clássico Pokémon Green com gráficos atualizados e melhorias.",
    "image": "/images/games/gba/Pokemon - Leaf Green Version.webp",
    "rating": "0.92",
    "players": "2",
    "releasedate": "2004-09-09"
  },
  {
    "id": "9",
    "name": "Super Mario Advance 2: Super Mario World",
    "path": "gba/Super Mario Advance 2 - Super Mario World.gba",
    "core": "gba",
    "desc": "Versão portátil do aclamado Super Mario World, com Yoshi e fases desafiadoras.",
    "image": "/images/games/gba/Super Mario Advance 2 - Super Mario World.webp",
    "rating": "0.92",
    "players": "1",
    "releasedate": "2002-02-11"
  },
  {
    "id": "1",
    "name": "The Legend of Zelda: The Minish Cap",
    "path": "gba/The Legend of Zelda - The Minish Cap.gba",
    "core": "gba",
    "desc": "Ajude Link a derrotar o vilão Vaati encolhendo para explorar o mundo dos Minish.",
    "image": "/images/games/gba/The Legend of Zelda - The Minish Cap.webp",
    "rating": "0.95",
    "players": "1",
    "releasedate": "2005-01-10"
  },
   {
    "id": "22",
    "name": "Tony Hawk's American Sk8land",
    "path": "gba/Tony Hawk's American Sk8land.gba",
    "core": "gba",
    "desc": "Skate radical em ambientes urbanos com manobras famosas da franquia Tony Hawk.",
    "image": "/images/games/gba/Tony Hawk's American Sk8land.webp",
    "rating": "0.85",
    "players": "1",
    "releasedate": "2005-11-14"
  },
  // {
  //   "id": "10",
  //   "name": "WarioWare, Inc.: Mega Microgames!",
  //   "path": "gba/WarioWare Inc - Mega Microgames!.gba",
  //   "core": "gba",
  //   "desc": "Jogo frenético de microgames bizarros com jogabilidade viciante.",
  //   "image": "/images/games/gba/WarioWare Inc-thumb.webp",
  //   "rating": "0.89",
  //   "players": "1",
  //   "releasedate": "2003-05-26"
  // },
  // {
  //   "id": "18",
  //   "name": "Yoshi's Island: Super Mario Advance 3",
  //   "path": "gba/Yoshi's Island - Super Mario Advance 3.gba",
  //   "core": "gba",
  //   "desc": "Versão portátil com visual artístico encantador e jogabilidade criativa.",
  //   "image": "/images/games/gba/Yoshi's Island-thumb.webp",
  //   "rating": "0.90",
  //   "players": "1",
  //   "releasedate": "2002-09-23"
  // },
  {
    "id": "23",
    "name": "Wario Land 4",
    "path": "gba/Wario Land 4.gba",
    "core": "gba",
    "desc": "Wario embarca em uma jornada cheia de tesouros, armadilhas e ação em plataformas criativas.",
    "image": "/images/games/gba/Wario Land 4.webp",
    "rating": "0.90",
    "players": "1",
    "releasedate": "2001-11-19"
  }
];
