import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fliperama Retrô</title>
        <meta name="description" content="Reviva a magia dos anos 80 e 90 com jogos retrô e aluguel de fliperamas!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Fliperama Retrô</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.banner}>
          <h2>Reviva a Magia dos Anos 80 e 90!</h2>
          <button className={styles.button}>Alugar Agora</button>
        </section>

        <section className={styles.services}>
          <div className={styles.service}>
            
          <Link href="/jogos-online" className={styles.link}>
            <h3>Jogos Online</h3>
            <p>Jogue clássicos como Pac-Man, Mario e Street Fighter direto do seu navegador!</p>
            </Link>
          </div>

          <div className={styles.service}>
            <h3>Aluguel de Fliperamas</h3>
            <p>Transforme qualquer evento em uma festa inesquecível com nossos fliperamas!</p>
          </div>

          <div className={styles.service}>
            <h3>Clube Retro</h3>
            <p>Assine e tenha acesso a consoles clássicos para jogar em casa.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; 2024 Fliperama Retrô. Feito com ❤️ para os amantes de jogos clássicos.{' '}
        <a href="#">Política de Privacidade</a>
      </footer>
    </div>
  );
}
