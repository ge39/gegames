/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gegamess.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api/*'], // ajuste se tiver rotas internas
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
