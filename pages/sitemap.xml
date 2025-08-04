// pages/sitemap.xml.js
import { arcadeGames } from '../data/arcadeGames'; // ajuste para importar de onde preferir

const SITE_URL = 'https://gegames.vercel.app';

export async function getServerSideProps({ res }) {
  const staticPages = [
    '',
    '/gamelistArcade',
    '/gamelistAtari',
    '/gamelistGba',
    '/gamelistMegadrive',
    '/adult-games',
    '/como-jogar'
  ];

  const dynamicGames = arcadeGames.map(game => game.slug); // Ajuste aqui se precisar

  const allUrls = [
    ...staticPages.map((page) => `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`),
    ...dynamicGames.map((slug) => `
      <url>
        <loc>${SITE_URL}/games/${slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.join('\n')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
