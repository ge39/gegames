import Head from 'next/head';

export default function SEOHead({ title, description, url }) {
  return (
    <Head>
      <title>{title ? `${title} | GegaMes` : 'GegaMes - Jogos Retrô Online'}</title>
      <meta name="description" content={description || "Jogue clássicos do SNES, Mega Drive, N64 e mais! Direto do navegador com multiplayer online."} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url || "https://gegames.vercel.app"} />
      <meta property="og:title" content={title || "GegaMes"} />
      <meta property="og:description" content={description || "Jogue clássicos retrô online diretamente do navegador."} />
      <meta property="og:url" content={url || "https://gegames.vercel.app"} />
      <meta property="og:type" content="website" />
    </Head>
  );
}
