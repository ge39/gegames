"use client";

import Head from 'next/head';
import styles from '../styles/Orcamento.module.css' ;
import "../styles/Global.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Orcamento() {
  return (
    <>
      {/* Navbar incluída */}
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>Solicitar Orçamento | Fliperama Retrô</title>
          <meta
            name="description"
            content="Preencha o formulário para solicitar um orçamento para o aluguel de fliperamas retrô."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <h1>Solicite Seu Orçamento</h1>
          <p>Entre em contato conosco para mais informações sobre aluguel de fliperamas retrô!</p>
        </header>

        <main className={styles.main}>
          <div className={styles.whatsappContact}>
            <a
              href="https://wa.me/5511975145360?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20fliperamas%20retrô!"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              Fale Conosco pelo WhatsApp
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
