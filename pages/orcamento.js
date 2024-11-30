"use client";

import Head from 'next/head';
import { useState } from 'react';
import styles from '@/styles/Orcamento.module.css';
import Navbar from '../components/Navbar';

export default function Orcamento() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setIsSubmitting(false);
    
    if (data.success) {
      setSubmitStatus('Sua solicitação foi enviada com sucesso!');
    } else {
      setSubmitStatus('Houve um erro ao enviar sua solicitação. Tente novamente.');
    }
  };

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
          <h1>Solicitar Orçamento</h1>
          <p>Preencha o formulário abaixo e entraremos em contato com você em breve!</p>
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

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Telefone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(xx) xxxxx-xxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="eventType">Tipo de Evento:</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="aniversario">Aniversário</option>
                <option value="casamento">Casamento</option>
                <option value="corporativo">Evento Corporativo</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Descreva brevemente seu evento ou dúvidas..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </form>

          {submitStatus && <p className={styles.statusMessage}>{submitStatus}</p>}

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

        <footer className={styles.footer}>
          &copy; gegames2024 Fliperama Retrô. Feito com ❤️ para os amantes de jogos clássicos.{' '}
          <a href="#">Política de Privacidade</a>
        </footer>
      </div>
    </>
  );
}
