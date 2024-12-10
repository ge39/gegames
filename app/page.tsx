"use client"; // Ativa o modo Client Component

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
         
      {/* Seção Home */}
      <section
        className="relative text-white py-24"
        id="home"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/assets/arcade3.jpg"
            alt="Pessoas jogando fliperama"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Nostalgia em sua Festa</h2>
          <p className="text-sm sm:text-base text-center">
            Tenha um fliperama retrô no seu evento e faça sua festa se destacar com diversão clássica!
          </p>

          {/* Imagem centralizada */}
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-[800px] h-auto">
              <Image
                src="/images/assets/arcade3.jpg"
                alt="Imagem de fliperama"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Botão Voltar ao topo */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </section>

      {/* Seção Locação */}
      <section
        className="relative text-white py-24"
        id="locacao"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/assets/arcade3.jpg"
            alt="Fliperama em locação"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Locação de Fliperamas</h2>
          <p className="text-sm sm:text-base text-center">
             Escolha uma de nossas máquinas clássicas e leve a magia de um verdadeiro fliperama para o seu evento!
          </p>

          {/* Imagem centralizada */}
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-[800px] h-auto">
              <Image
                src="/images/eventos/Fliperama_locacao.jpg"
                alt="Imagem de fliperama"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Botão Voltar ao topo */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </section>

      {/* Seção Orçamento */}
      <section
        className="relative text-white py-24"
        id="orcamento"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/assets/arcade3.jpg"
            alt="Formulário de orçamento"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Solicite um Orçamento</h2>
          <p className="text-sm sm:text-base text-center">
            Entre em contato e descubra como levar diversão e nostalgia ao seu evento.
          </p>

          {/* Imagem centralizada */}
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-[800px] h-auto">
              <Image
                src="/images/assets/neogeox.jpg"
                alt="Imagem de fliperama"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Botão WhatsApp com texto */}
          <div className="flex justify-center mt-8">
            <Link
              href="https://wa.me/5511999999999" // Substitua pelo número do WhatsApp
              target="_blank"
              className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-400 transition"
            >
              <span className="text-sm sm:text-base">Fale pelo WhatsApp</span>
            </Link>
          </div>

          {/* Botão Voltar ao topo */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </section>

      {/* Seção Lista de Jogos */}
      <section
        className="relative text-white py-24"
        id="jogos"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/assets/arcade3.jpg"
            alt="Jogos de fliperama"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Lista de Jogos</h2>
          <p className="text-sm sm:text-base text-center">
            Descubra os jogos clássicos disponíveis para sua festa ou evento!
          </p>

          {/* Imagem centralizada */}
          <div className="flex justify-center mt-6">
            <div className="relative w-full max-w-[800px] h-auto">
              <Image
                src="/images/assets/arcade3.jpg"
                alt="Imagem de fliperama"
                width={800}
                height={400}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Botão Voltar ao topo */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section
        className="relative text-white py-24"
        id="sobre"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/assets/eidos.jpg"
            alt="Sobre nós"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-red-600">Sobre Nós</h2>
          <p className="text-lg sm:text-2xl text-center text-blue-800">
            Conheça a nossa história e como trouxemos a diversão dos fliperamas clássicos para os seus eventos.
          <br />
              
             Somos uma empresa apaixonada por jogos retrô e diversão de alta qualidade! Crescemos juntos com a geração dos video games e auge dos fliperamas. Somos apaixonados pelos jogos eletronicos que fizeram nossa infância mais feliz.Nosso objetivo 
             é não deixar este legado ficar no esquecimento e tambem levar até voce estes momentos de nostalgia e diversão para transformar eventos em experiências inesquecíveis, oferecendo o aluguel de fliperamas clássicos que trazem toda a magia e nostalgia dos jogos arcade.
             Com uma seleção cuidadosa de Jogos, recriamos o ambiente vibrante dos fliperamas dos anos 80 e 90, garantindo momentos únicos para festas, eventos corporativos, casamentos e celebrações em geral.
             Acreditamos no poder dos jogos de unir pessoas e criar memórias especiais. Por isso, nos dedicamos a entregar um serviço completo, com equipamentos de alta qualidade, suporte técnico e personalização para atender às suas necessidades.
             Reviva os clássicos, encante seus convidados e leve a diversão a outro nível com nossos fliperamas retrô!
          </p>

          {/* Botão Voltar ao topo */}
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
