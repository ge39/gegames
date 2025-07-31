// pages/sitemap.xml.js
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

  // Exemplo de rotas dinâmicas de jogos
  const dynamicGames = [
    'super-mario-world',
    'street-fighter-ii',
    'sonic-the-hedgehog',
    'mortal-kombat'
  ];

  const allUrls = [
    ...staticPages.map((page) => `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <priority>0.8</priority>
      </url>`),
    ...dynamicGames.map((slug) => `
      <url>
        <loc>${SITE_URL}/games/${slug}</loc>
        <priority>0.7</priority>
      </url>`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}

