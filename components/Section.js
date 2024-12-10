'use client'; // Marca o componente para ser executado no cliente

import styles from '../styles/Section.module.css';
import { useState, useEffect } from 'react';

// Tipagem das props para o componente
interface SectionProps {
  id: string;
  title: string;
  description: string;
  images?: string[];  // Lista de imagens
  image?: string;     // Única imagem
  buttonText?: string;
  link?: string;
  linkText?: string;
}

export default function Section({
  id,
  title,
  description,
  images,
  image,
  buttonText,
  link,
  linkText,
}: SectionProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section id={id} className={styles.section}>
      <h2>{title}</h2>
      <p>{description}</p>
      {images && images.length > 0 && <img src={images[currentImage]} alt={title} />}
      {image && <img src={image} alt={title} />}
      {link && (
        <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      )}
      {buttonText && (
        <a href="#top" className={styles.topButton}>
          {buttonText}
        </a>
      )}
    </section>
  );
}
