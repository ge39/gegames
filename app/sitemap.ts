import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://gegames.vercel.app/', lastModified: new Date() },
    { url: 'https://gegames.vercel.app/lista-de-jogos-snes-online', lastModified: new Date() },
    { url: 'https://gegames.vercel.app/aluguel-fliperamas', lastModified: new Date() },
  ];
}
