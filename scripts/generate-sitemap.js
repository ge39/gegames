// scripts/generate-sitemap.js
const fs = require("fs");
const globby = require("globby");

(async () => {
  const pages = await globby([
    "pages/**/*.js",
    "!pages/_*.js",
    "!pages/api",
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace("pages", "")
      .replace(".js", "")
      .replace("/index", "");
    const route = `https://gegames.vercel.app${path}`;
    return `<url><loc>${route}</loc></url>`;
  })
  .join("")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log("✅ Sitemap gerado com sucesso!");
})();
// To run this script, use the command: node scripts/generate-sitemap.js