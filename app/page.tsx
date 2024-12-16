"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import EventSection from "../components/EventSection"; // Import do componente EventSection

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Home Section */}
      <section
        id="home"
        style={{
          backgroundColor: "#F5DEB3",
          padding: "50px 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            backgroundColor: "#228B22",
            padding: "2%",
            textAlign: "center",
            color: "snow",
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: "-40px",
            marginBottom: "10px",
          }}
        >
          Fliperamas Retrô, Nostalgia para Seus Eventos
        </h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Image
            src="/images/Fliperamas/arcade3.jpg"
            alt="Fliperama"
            width={1000}
            height={1000}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <p
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(230, 230, 250, 0.10)",
            borderRadius: "10px",
            width: "85%",
            color: "snow",
            fontSize: "90%",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          ALUGAMOS FLIPERAMAS COM JOGOS RETRÔ PARA TODOS OS TIPOS DE EVENTOS...
        </p>
        <div style={{ textAlign: "center" }}>
          <a
            href="#top"
            style={{
              backgroundColor: "#FF4500",
              padding: "10px 20px",
              borderRadius: "5px",
              color: "#fff",
            }}
          >
            Voltar ao Topo
          </a>
        </div>
      </section>
                 {/* Nosso Plano Section */}
     <section
       id="nosso-plano"
       style={{
         backgroundColor: "#C0C0C0",
         padding: "50px 20px",
         position: "relative",
       }}
     >
       <h1
         style={{
           textAlign: "center",
           color: "#204080",
           fontWeight: "bold",
           marginBottom: "20px",
         }}
       >
         NOSSOS PLANOS
       </h1>
       <div style={{ textAlign: "center", marginBottom: "20px" }}>
         <Image
           src="/images/eventos/Fliperama_locacao.jpg"
           alt="Fliperama"
           width={1000}
           height={1000}
           style={{ borderRadius: "8px", objectFit: "cover" }}
         />
       </div>
       <div style={{ textAlign: "center" }}>
          <a
            href="#top"
            style={{
              backgroundColor: "#FF4500",
              padding: "10px 20px",
              borderRadius: "5px",
              color: "#fff",
            }}
            >
            Voltar ao Topo
          </a>
      </div>
     </section>
      {/* Orçamento Section */}
      <section
        id="orcamento"
        style={{
          backgroundColor: "#77c5d5",
          padding: "50px 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#204080",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          FALE CONOSCO
        </h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Image
            src="/images/Fliperamas/arcade2.jpg"
            alt="Fliperama"
            width={1200}
            height={600}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <p
          style={{
            color: "#fff",
            padding: "10px",
            fontWeight: "bold",
            textAlign: "center",
            width: "90%",
          }}
        >
          ENTRE EM CONTATO PARA RECEBER UM ORÇAMENTO PERSONALIZADO...
        </p>

        {/* Botão WhatsApp */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="https://wa.me/5511975145360"
            target="_blank"
            style={{
              backgroundColor: "#25d366",
              padding: "10px 20px",
              borderRadius: "5px",
              color: "#fff",
              display: "inline-block",
              marginBottom:"18px",
            }}
          >
            Fale pelo WhatsApp
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
            <a
              href="#top"
              style={{
                backgroundColor: "#FF4500",
                padding: "10px 20px",
                borderRadius: "5px",
                color: "#fff",
              }}
              >
              Voltar ao Topo
            </a>
        </div>
      </section>

      {/* Eventos Section */}
      <section
        id="eventos"
        style={{
          backgroundColor: "#F5DEB3",
          padding: "50px 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#204080",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          NOSSOS EVENTOS REALIZADOS
        </h1>

        {/* Adicionando o Componente EventSection */}
        <EventSection />
        <div style={{ textAlign: "center" }}>
           <a
             href="#top"
             style={{
               backgroundColor: "#FF4500",
               padding: "10px 20px",
               borderRadius: "5px",
               color: "#fff",
             }}
             >
             Voltar ao Topo
           </a>
       </div>
      </section>

       {/* Sobre Section */}
      <section
        id="sobre"
        style={{
          backgroundColor: "#77c5d5",
          padding: "50px 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#204080",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          SOBRE NÓS
        </h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Image
            src="/images/assets/arts/Eidos.jpg"
            alt="Fliperama"
            width={1200}
            height={1200}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <p
          style={{
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom:"15px",
          }}
        >
          Conheça nossa história e paixão por fliperamas retrô...
        </p>
        <div style={{ textAlign: "center" }}>
           <a
             href="#top"
             style={{
               backgroundColor: "#FF4500",
               padding: "10px 20px",
               borderRadius: "5px",
               color: "#fff",
               marginTop:"15px",
             }}
             >
             Voltar ao Topo
           </a>
       </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
