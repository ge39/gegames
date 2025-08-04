import { arcadeGames } from "@/data/ArcadeGames";
// Importe os outros arrays de jogos da mesma forma, se existirem:
 import { snesGames } from "@/data/SnesGames";
 import { atariGames } from "@/data/AtariGames";
 import { gbaGames } from "@/data/GbaGames";
 import { megadriveGames } from "@/data/megadriveGames";

export async function GET() {
  const baseUrl = "https://gegames.vercel.app";

  const staticPages = [
    "",
    "/gamelistArcade",
    "/gamelistSnes",
    "/gamelistAtari",
    "/gamelistGba",
    "/gamelistMegadrive",
    "/como-jogar",
  ];

  // URLs estáticas
  const staticUrls = staticPages
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("");

  // Todos os jogos juntos (adicione os arrays de jogos conforme seus arquivos)
  const allGames = [
    ...arcadeGames,
    // ...snesGames,
    // ...atariGames,
    // ...gbaGames,
    // ...megadriveGames,
  ];

  // URLs dinâmicas dos jogos, filtrando para garantir que id exista
  const gameUrls = allGames
    .filter((game) => game?.id) // evita undefined
    .map(
      (game) => `
    <url>
      <loc>${baseUrl}/games/${game.id}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${gameUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
