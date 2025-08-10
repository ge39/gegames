import Head from "next/head";

export default function HeadJogosRetro() {
  return (
    <Head>
      <title>Jogos Clássicos Retrô Online | Jogue no Navegador | Gegames</title>
      <meta
        name="description"
        content="Reviva os melhores momentos da infância com jogos retrô online direto do navegador. Jogue SNES, Mega Drive, Game Boy, PS1 e muito mais gratuitamente com webcam!"
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Gegames" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content="google6f561de9f8982561" />

      {/* Open Graph (Facebook, WhatsApp, etc.) */}
      <meta property="og:title" content="Jogue Clássicos Retrô Online | Gegames" />
      <meta
        property="og:description"
        content="Curta jogos nostálgicos direto no navegador: SNES, NES, Mega Drive, GBA e mais. Com suporte a webcam entre amigos!"
      />
      <meta property="og:url" content="https://gegames.vercel.app/jogos-online-retro" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://gegames.vercel.app/logo/arcade.png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Jogue Clássicos Retrô Online | Gegames" />
      <meta
        name="twitter:description"
        content="Reviva os clássicos dos anos 80/90 no navegador. Jogue com webcam e desafie seus amigos!"
      />
      <meta name="twitter:image" content="https://gegames.vercel.app/logo/arcade.png" />

      <link rel="canonical" href="https://gegames.vercel.app/jogos-online-retro" />
      <meta name="google-site-verification" content="01gWc9EGEoGdMf7W7-8QhdAN0ifanxUfTNMRvKCoYaU" />
    </Head>
  );
}
