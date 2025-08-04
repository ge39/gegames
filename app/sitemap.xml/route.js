// app/sitemap.xml/route.js
import { arcadeGames } from '@/data/arcadeGames';
import { snesGames } from '@/data/snesGames';
import { gbaGames } from '@/data/gbaGames';
import { megadriveGames } from '@/data/megadriveGames';
import { atariGames } from '@/data/atariGames';

export async function GET() {
  const baseUrl = 'https://gegames.vercel.app';

  const staticPages = [
    '',
    '/gamelistArcade',
    '/gamelistSnes',
    '/gamelistGba',
    '/gamelistMegadrive',
    '/gamelistAtari',
    '/como-jogar',
  ];

  // Função para gerar rotas dos jogos
  const generateGameUrls = (games, prefix) =>
    games.map(
      (game) => `
    <url>
      <loc>${baseUrl}/${prefix}/${game.id}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`
    );

  const gameUrls = [
    ...generateGameUrls(arcadeGames, 'arcade'),
    ...generateGameUrls(snesGames, 'snes'),
    ...generateGameUrls(gbaGames, 'gba'),
    ...generateGameUrls(megadriveGames, 'megadrive'),
    ...generateGameUrls(atariGames, 'atari'),
  ];

  const staticUrls = staticPages
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${staticUrls.join('')}
  ${gameUrls.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

