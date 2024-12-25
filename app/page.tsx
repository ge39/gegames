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
      <style jsx>{`
    #home {
      position: relative;
    }

    #home h1 {
      border-radius: 10px;
      background-color: #438;
      padding: 1%;
      text-align: center;
      color: snow;
      font-size: 24px;
      font-weight: bold;
      margin: 10px 0;
      width: 100%;
    }
    .column2{
      padding: 0;  // Remove margens
    }
    #Home div h1 {
      color:'black',
      }
    // #home p {
      // position: absolute;
      // top: 65%;
      // left: 50%;
      // transform: translate(-50%, -50%);
       background-color: rgba(14, 14, 13, 0.75);
      // border-radius: 10px;
      // width: 100%;
      // color: yellow;
      // font-size: 1.8rem;
      // font-weight: bold;
      // text-align: center;
      // max-width: 1000px;
      // padding: 10px;
      // margin-top: 120px; /* Aqui está a correção */
    // }
    #sobre p {
      color: red,
    }
    @media screen and (max-width: 768px) {
     .column2 {
      width: 100% !important;  // Força a largura a ser 100% em telas pequenas
      padding: 10px;  // Remove margens
      margin-top:10px;
      border: solid 1px #333,
      }
      #home {
        height: auto;
        padding-bottom: 20px;
      }
      #home h1 {
        font-size: 18px;
        padding: 10px;
      }
      #home p {
        font-size: 14px;
        padding: 8px;
        width: 90%;
        height:"auto";
        margin-top: 2%; /* Ajuste para telas menores */
       
      }
       .container {
         flex-direction: column; // Alinha as colunas uma abaixo da outra em telas pequenas
         align-items: stretch;   // Assegura que as colunas se estiquem para ocupar toda a largura disponível
      }
       .column {
         flex: 1 0 100%;         // As colunas terão 100% de largura em telas pequenas
         margin: 10px 0;         // Ajusta a margem para garantir espaçamento vertical
       }
        @media screen and (max-width: 610px) {
      #home p {
     font-size: 14px;
     padding: 8px;
     width: 90%;
     height:"auto";
     margin-top: -38%; /* Ajuste para telas menores */
   }
 }
  `}
</style>

      {/* Home Section */}

<section  
  id="home" 
  style={{
    // backgroundImage: "url('/images/fliperamas/arcade2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    position: "relative",
    paddingBottom: '10px',
  }}
> 

  <h1>
    {/* Fliperamas Retrô, Nostalgia para Seus Eventos */}
    ALUGUEL DE FLIPERAMAS RETRÔ COM OS MELHORES JOGOS DOS ANOS 80 E 90 ...
  </h1>

  {/* <p> */}
  {/* ALUGUEL DE FLIPERAMAS COM OS MELHORES JOGOS RETRÔS DOS ANOS 80 E 90 ... */}
  {/* </p> */}

  <div 
    className="conteiner" 
    style={{
      display: 'inline-flex',          // Flexbox para alinhar as colunas lado a lado
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: '0', // Adiciona um espaço entre o conteúdo principal e as colunas
      flexWrap: 'wrap',             // Permite que as colunas se movam para a próxima linha se não houver espaço
    }}
    >
    <div 
      className="column" 
      style={{
        flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '20px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'flex',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',               // Define uma altura fixa para as colunas (ajustável)
        
      }}
    >
      <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>A Experiência e Tradição</h2>
      <span>Com mais de 20 anos de experiência no mundo da Tecnologia da Informação e redes de comunicação, 
        transformamos nossa paixão por máquinas e tecnologia em uma verdadeira arte. Ao longo dos anos, 
        fomos criando e refinando as habilidades na fabricação de fliperamas e bartops, 
        com a dedicação de quem sabe que a nostalgia dos jogos retrôs é mais do que diversão, é uma viagem no tempo. 
        Cada máquina construída carrega a essência de décadas de conhecimento e dedicação, pronta para levar sua festa, 
        evento ou estabelecimento a um nível único de entretenimento
        </span>
    </div>
    
    <div 
      className="column" 
      style={{
        flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '20px',
        margin: '10px ',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'flex',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',               // Define uma altura fixa para as colunas (ajustável)
       
      }}
    >
      <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2>
      <span>Imagine a emoção de ver os olhos brilhando ao recordar os clássicos dos anos 80 e 90, 
        sentir a adrenalina da vitória no som das fichas caindo e na tela piscando com a próxima rodada. 
        Nosso propósito vai além de oferecer apenas um fliperama para aluguel – entregamos uma experiência imersiva,
         repleta de emoção, alegria e nostalgia. De festas de aniversário a eventos corporativos, cada jogo,
        cada controle e cada detalhe de nossas máquinas são projetados para proporcionar momentos inesquecíveis,
         que marcarão a memória de todos que jogarem.
      </span>
     
    </div>

    <div 
      className="column" 
      style={{
        flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '20px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'flex',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        // justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',                 // Define uma altura fixa para as colunas (ajustável)
                     
      }}
      >
      <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>Nossos Serviços</h2>

     <span>Alugar um fliperama é muito mais do que ter uma máquina em sua festa ou evento – é trazer de volta 
        os melhores momentos da sua vida, compartilhar risadas com amigos, competir com a família e sentir o 
        prazer de viver um passado glorioso. Ao alugar uma de nossas máquinas, você não está apenas contratando 
        um serviço.  
       Oferecemos entrega, instalação, retirada e suporte técnico completo para que você aproveite cada momento 
       sem preocupações.  E mediante acordo prévio, organizamos pequenos torneios entre os presentes do evento.
      </span>
    </div>

  </div>

  <div 
      className="conteiner" 
      style={{
        display: 'inline-flex',          // Flexbox para alinhar as colunas lado a lado
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: ' 0 15px',
        marginTop: '0', // Adiciona um espaço entre o conteúdo principal e as colunas
        flexWrap: 'wrap',             // Permite que as colunas se movam para a próxima linha se não houver espaço
      }}
      >
     
    <div 
      className="column2" 
      style={{
       
        // flex: 1,
        margin: '0 10px', // Espaçamento entre as colunas
        backgroundImage: "url('./images/Fliperamas/fotoarcade2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: '300px',
        position: "relative",
        paddingBottom: '10px',
        width: "32%", // largura padrão para telas grandes
      
      }}
      >
      {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2> */}
            
    </div>

    <div 
      className="column2" 
      style={{
        // flex: 1, // As colunas terão o mesmo tamanho
        margin: '0 10px', // Espaçamento entre as colunas
        backgroundImage: "url('./images/Fliperamas/arcadestreet.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: '300px',
        position: "relative",
        paddingBottom: '10px',
        width: "32%", // largura padrão para telas grandes        
      }}
      >
      {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>A Jornada do Cliente e a Conexão</h2> */}
    </div>

    <div 
      className="column2" 
      style={{
        // flex: 1, // As colunas terão o mesmo tamanho
        margin: '0 10px', // Espaçamento entre as colunas
        backgroundImage: "url('./images/Fliperamas/fotoarcade2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: '300px',
        position: "relative",
        paddingBottom: '10px',
        width: "32%", // largura padrão para telas grandes       
      }}
      >
      {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2> */}
    
    </div>
  </div>
</section>


{/* {{nosso plano}} */}
<section
   id="nosso-plano"
   style={{
    //  backgroundColor: "#C0C0C0",
    backgroundImage: "url('/images/bk/bk-cinza-branco.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
     padding: "50px 20px",
     position: "relative",
     paddingBottom:'20px',
     
   }}
>
  <h1
    style={{
      textAlign: "center",
      color: "#204080",
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize:'24px',
    }}
  >
    NOSSOS PLANOS 
  </h1>

  <p
  style={{
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize:'24px',
  }}
>
   A primeira Locação tem 10% de  desconto 
</p>
<p
  style={{
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize:'24px',
  }}
>
   A cada Locação acumule cupom de 5% descontos para seu próximo evento. 
</p>

  <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
    <Image
      src="/images/eventos/Fliperama_locacao.jpg"
      alt="Fliperama"
      width={1600}
      height={200}
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
          backgroundImage: "url('/images/Fliperamas/arcade2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "600px",
          padding: "50px 20px",
          position: "relative",
        }}
      >
        <h1
          style={{
            padding:'20px',
            textAlign: "center",
            fontSize:'24px',
            color: "snow",
            fontWeight: "bold",
            // marginTop: "10%",
          }}
        >
          FALE CONOSCO 
        </h1>
        <div style={{
           display: "flex", justifyContent: "center", marginBottom: "20px"  }}>
        </div>
        <p
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            padding:'15px',
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(230, 230, 250, 0.90)",
            borderRadius: "10px",
            width: "90%",
            color: "#333",
            fontSize: "90%",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "900px",   
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
              marginTop:'250px',
              backgroundColor: "#25d366",
              padding: "10px 20px",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "100%",
              display: "inline-block",
              marginBottom:"18px",
            }}
          >
            Fale pelo WhatsApp
          </a>
        </div>
        <div style={{ textAlign: "center"}}>
            <a
              href="#top"
              style={{
                left:"50%",
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
          backgroundImage: "url('/images/fliperamas/arcade1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "relative",
        
        }}
      >
        <h1
          style={{
            // backgroundColor: "lightgrey",
            textAlign: "center",
            color: "snow",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize:'24px',
            paddingTop:"20px",
          }}
        >
          NOSSOS EVENTOS REALIZADOS
        </h1>

        {/* Adicionando o Componente EventSection */}
        <EventSection />
        <div style={{ textAlign: "center",padding: "40px 20px", }}>
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
          // backgroundColor: "#77c5d5",
          backgroundImage: "url('/images/Fliperamas/arcade3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "0 auto",
          position: "relative",

        }}
      >
        <h1
          style={{
            // position:"relative",
            paddingTop:'60px',
            textAlign: "center",
            color: "snow",
            fontSize:'24px',
            fontWeight: "bold",
            marginBottom: "150px",
          }}
        >
          SOBRE NÓS
          <p>Conheça nossa história e paixão por fliperamas retrô...</p>
        </h1>
          <div style={{ textAlign: "center"}}>
            <a
              href="#top"
              style={{
                left:"50%",
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
