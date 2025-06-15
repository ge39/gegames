import { promises as fs } from "fs";
import path from "path";

export async function getServerSideProps({ res }) {
  const baseUrl = "https://gegames.vercel.app";

  const staticPages = [
    { loc: "/", priority: "1.0" },
    { loc: "/jogos-online-retro", priority: "0.9" },
    { loc: "/lista-de-jogos-arcade-online", priority: "0.8" },
    { loc: "/gamelistAtari", priority: "0.7" },
    { loc: "/gamelistMegadrive", priority: "0.6" },
    { loc: "/gamelistSnes", priority: "0.5" },
  ];

  const filePath = path.join(process.cwd(), "data", "games.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const games = JSON.parse(jsonData);

  const urls = [
    ...staticPages.map(page => `
      <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `),
    ...games.map(game => `
      <url>
        <loc>${baseUrl}/jogo/${game.slug}</loc>
        <lastmod>${game.lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}
