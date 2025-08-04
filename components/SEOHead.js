import { arcadeGames } from "@/data/arcadeGames";
import { snesGames } from "@/data/snesGames";
import { atariGames } from "@/data/atariGames";
import { gbaGames } from "@/data/gbaGames";
import { megadriveGames } from "@/data/MegadriveGames";
import { adultGames } from "@/data/adultGames";

export async function GET() {
  const baseUrl = "https://gegames.vercel.app";

  const staticPages = [
    "",
    "/gamelist",
    "/gamelistArcade",
    "/gamelistSnes",
    "/gamelistAtari",
    "/gamelistGba",
    "/gamelistMegadrive",
    "/adult-games",
    "/como-jogar",
  ];

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

  const generateGameUrls = (gamesArray) =>
    Array.isArray(gamesArray)
      ? gamesArray
          .map(
            (game) => `
    <url>
      <loc>${baseUrl}/jogo/${game.id}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`
          )
          .join("")
      : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${generateGameUrls(arcadeGames)}
  ${generateGameUrls(snesGames)}
  ${generateGameUrls(atariGames)}
  ${generateGameUrls(gbaGames)}
  ${generateGameUrls(megadriveGames)}
  ${generateGameUrls(adultGames)}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
