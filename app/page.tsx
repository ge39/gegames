import Head from 'next/head';
import Link from 'next/link';
import "../styles/Global.css";
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fliperama Retrô</title>
        <meta name="description" content="Reviva a magia dos anos 80 e 90 com jogos retrô e aluguel de fliperamas!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <header className={styles.header}>
        <h1>Fliperama Retrô</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.banner}>
          <h2>Reviva a Magia dos Anos 80 e 90!</h2>
          <Link href="/locacao" className={styles.link}>
            <button className={styles.button}> Alugar Agora </button>
          </Link>
        </section>

        <section className={styles.services}>
          <div className={styles.service}>
            <Link href="/gamelist" className={styles.link}>
              <h3>Jogos Online</h3>
              <p>Jogue clássicos como Pac-Man, Mario e Street Fighter direto do seu navegador!</p>
            </Link>
          </div>

          <div className={styles.service}>
            <Link href="/locacao" className={styles.link}>
              <h3>Aluguel de Fliperamas</h3>
              <p>Transforme qualquer evento em uma festa inesquecível com nossos fliperamas!</p>
            </Link>
          </div>

          <div className={styles.service}>
            <Link href="/orcamento" className={styles.link}>
              <h3>Contato/orçamento</h3>
            </Link>
            <p>Entre em contato conosco pelo Whatsapp.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
