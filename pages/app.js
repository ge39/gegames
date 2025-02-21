import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Melhores Jogos Retrô | Fliperamas e Jogos Online</title>
        <meta name="description" content="Jogue online clássicos do SNES, Mega Drive e Arcade ou alugue fliperamas para eventos!" />
        <meta property="og:title" content="Melhores Jogos Retrô | Fliperamas e Jogos Online" />
        <meta property="og:description" content="Jogue online clássicos do SNES, Mega Drive e Arcade ou alugue fliperamas para eventos!" />
        <meta property="og:image" content="https://gegames.vercel.app/images/assets/logos2/jogueOnlineMelhorada.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
