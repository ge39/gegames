"use client";
import EventSection from "../components/EventSection"; // Import do componente EventSection
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import ButtonTop from "../components/ButtonTop";


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
        padding: 10px;
        justify-content:center;
        text-align: center;
        margin-left:1.5%;
        margin-right:.5%;
        color: snow;
        // font-size: 20px;
        font-weight: bold;
        margin-top: 0.5%  ;
        width: 99%;
      }
          #Home div h1 {
          color:'black',
          }
      #sobre p {
        color: red,
      }
        .column2{
          padding: 0px;
          margin-top: 10px;
          width:30%;
        }
      @media screen and (max-width: 768px) {
       .column2 {
        max-width: 90% !important;  // Força a largura a ser 100% em telas pequenas
        padding: 10px;  // Remove margens
        margin:10px;
        border: solid 1px #333,
        }
        .column {
          margin-top: -10px;
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
    // width: "90%",
    position: "relative",
    // padding: '0px 10px',
  }}
> 

      
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
      marginTop: '45px', // Adiciona um espaço entre o conteúdo principal e as colunas
      flexWrap: 'wrap',             // Permite que as colunas se movam para a próxima linha se não houver espaço
    }}
    >
      <h1>  ALUGUEL DE FLIPERAMAS RETRÔ COM OS MELHORES JOGOS DOS ANOS 80 E 90 ...</h1>
    <div 
      className="column" 
      style={{
        // flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'inline-flex',
        width:'30%',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',               // Define uma altura fixa para as colunas (ajustável)
        
      }}

    >
      <h2 style={{color:'black',fontWeight:'bold',margin: '5px 0'}}>A Experiência e Tradição</h2>
      <span style={{textAlign:'justify'}}>Com mais de 20 anos de experiência no mundo da Tecnologia da Informação e redes de comunicação, 
        transformamos nossa paixão por máquinas e tecnologia em uma verdadeira arte. Ao longo dos anos, 
        fomos criando e refinando as habilidades na fabricação de fliperamas e bartops, 
        com a dedicação de quem sabe que a nostalgia dos jogos retrôs é mais do que diversão, é uma viagem no tempo. 
        Cada máquina construída carrega a essência de décadas de conhecimento e dedicação, pronta para levar sua festa, 
        evento ou estabelecimento a um nível único de entretenimento
        </span>
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
          width: "100%", // largura padrão para telas grandes
        
        }}
    >
  {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2> */}
        
</div>
    </div>
    
    <div 
      className="column" 
      style={{
        // flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '10px',
        margin: '0 10px', // Espaçamento entre as colunas
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'inline-flex',
        width:'30%',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',               // Define uma altura fixa para as colunas (ajustável)
       
      }}
    >
      <h2 style={{color:'black',fontWeight:'bold',margin: '5px 0 '}}>O Encanto do Fliperama</h2>
      <span style={{padding:'5px',textAlign:'justify'}}>Imagine a emoção de ver os olhos brilhando ao recordar os clássicos dos anos 80 e 90, 
        sentir a adrenalina da vitória no som das fichas caindo e na tela piscando com a próxima rodada. 
        Nosso propósito vai além de oferecer apenas um fliperama para aluguel – entregamos uma experiência imersiva,
         repleta de emoção, alegria e nostalgia. De festas de aniversário a eventos corporativos, cada jogo,
        cada controle e cada detalhe de nossas máquinas são projetados para proporcionar momentos inesquecíveis,
         que marcarão a memória de todos que jogarem.
      </span>

      <div 
  className="column2" 
  style={{
   
    // flex: 1,
    margin: '0 10px', // Espaçamento entre as colunas
    backgroundImage: "url('./images/Fliperamas/arcadestreet.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: '300px',
    position: "relative",
    paddingBottom: '10px',
    width: "100%", // largura padrão para telas grandes
  
  }}
  >
  {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2> */}
        
</div>
     
    </div>

    <div 
      className="column" 
      style={{
        // flex: 1,                       // As colunas terão o mesmo tamanho
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo branco com 70% de transparência
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // sombra opcional para destaque
        display: 'inline-flex',
        width:'30%',               // Flexbox para centralizar o texto
        flexDirection: 'column',       // Para garantir que o conteúdo (título e texto) fiquem empilhados verticalmente
        // justifyContent: 'center',      // Centraliza verticalmente
        alignItems: 'center',          // Centraliza horizontalmente
        height: 'auto',                 // Define uma altura fixa para as colunas (ajustável)
                     
      }}
      >
      <h2 style={{color:'black',fontWeight:'bold',margin: '5px 0'}}>Nossos Serviços</h2>

     <span style={{padding:'5px',textAlign:'justify'}}>Alugar um fliperama é muito mais do que ter uma máquina em sua festa ou evento – é trazer de volta 
        os melhores momentos da sua vida, compartilhar risadas com amigos, competir com a família e sentir o 
        prazer de viver um passado glorioso. Ao alugar uma de nossas máquinas, você não está apenas contratando 
        um serviço.  
       Oferecemos entrega, instalação, retirada e suporte técnico completo para que você aproveite cada momento 
       sem preocupações.  E mediante acordo prévio, organizamos pequenos torneios entre os presentes do evento.
      </span>
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
          width: "100%", // largura padrão para telas grandes    
        }}
        >
        {/* <h2 style={{color:'black',fontWeight:'bold',margin: '10px 0'}}>O Propósito e o Encanto do Fliperama</h2> */}
    
      </div>
    </div>
      
  </div>
  
</section>
          {/* Jogue online */}
<section id="nosso-servico" style={{ padding: '20px 10px', position: 'relative' }}>
  
  <h1 style={{ backgroundColor:"#438",padding:"10px ",textAlign: 'center', color: 'snow',
     fontWeight: 'bold', margin: '1%',borderRadius: '10px', }}>
   APROVEITE NOSSA PROMOÇÃO COM 10% DE DESCONTO NA PRIMEIRA LOCAÇÃO.
  </h1>
  <div style={{ textAlign: 'center',width:'100%', backgroundColor: 'rgba(0,0,0,9)' }}>
     <Image
       src="/images/bk/suporteArcade.webp"
       alt="Fliperama"
       width={900}
       height={500}
       style={{ borderRadius: '8px', objectFit: 'cover', width: '100%',transform: '(-50%, -50%)', }}
     />
   </div>
    {/* Acesse versões digitais dos nossos fliperamas e divirta-se onde estiver...... */}
    {/* </span> */}
   
   {/* Botão Jogue Centralizado */}
   <div style={{ position: 'absolute',bottom: '50%', left: '50%',width:'30%', transform: 'translateX(-50%)', 
    
    textAlign: 'center', zIndex: 10 }}>
     <a href="https://wa.me/5511975145360" target="_blank" style={{
       backgroundColor: '#25d366',fontSize:"1.5rem", fontWeight:'bold', padding:'2%',width:'100%',
       borderRadius: '5px', color: '#fff', display: 'inline-block',borderColor:"snow",
       boxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.9)', /* Adiciona sombra (opcional) */
     }}>
      Fale Conosco


     </a>
   </div>
</section>


<section id="jogue-online" style={{padding: '0 10px', position: 'relative' }}>
  
  <h1 style={{ backgroundColor:"#438",padding:"10px ",textAlign: 'center', color: 'snow',
    fontWeight: 'bold', margin: '1%',borderRadius: '10px', }}>
    JOGUE ONLINE OS MELHORES JOGOS - ARCADE / SNES / MEGADRIVE / ATARI
    </h1>
  <div style={{ textAlign: 'center',width:'100%', backgroundColor: 'rgba(0,0,0,9)' }}>
    <Image
    src="/images/bk/jogos-online2.webp"
    alt="Fliperama"
    width={900}
    height={500}
    style={{ borderRadius: '8px', objectFit: 'cover', width: '100%',transform: '(-50%, -50%)', }}
    />
  </div>
    {/* Acesse versões digitais dos nossos fliperamas e divirta-se onde estiver...... */}
    {/* </span> */}

    {/* Botão Jogue Centralizado */}
    <div style={{ position: 'absolute',bottom: '50%', left: '50%',width:'30%', transform: 'translateX(-50%)',  
    textAlign: 'center', zIndex: 10 }}>

    <a href="/jogos-online-retro" target="_blank" style={{
    backgroundColor: '#25d366',width:"100%", padding:'2%', fontWeight:'bold', fontSize:'1.5rem',
    borderRadius: '5px', color: '#fff', display: 'inline-block',borderColor:"snow",
    boxShadow: '0px 0px 15px 15px rgba(7, 7, 7, 0.9)', /* Adiciona sombra (opcional) */
    }}>
    Jogue Online
    </a>
  </div>
</section>

{/* {{nosso plano}} */}
<h1 style={{ backgroundColor:"#438",padding:"10px",textAlign: 'center', color: 'snow',
  fontWeight: 'bold', margin: '1%',borderRadius: '10px',maxWidth:'100%' }}>
  NOSSOS PLANOS
</h1>
<section  id="nosso-plano"  style={{
    // backgroundImage: "url('/images/bk/bk-cinza-branco.jpg')",
    backgroundColor:"#4382",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0px 10px",
    position: "relative",
   }}
  >
  <p style={{ padding:"10px 20px",textAlign: 'center', color: '#438',
    fontWeight: 'bold', marginBottom: '20px',borderRadius: '10px', }}>
    NA PRIMEIRA LOCAÇÃO GANHE 10% DE DESCONTO!
  </p>

  <div style={{ borderRadius: '8px', objectFit: 'cover', maxWidth: '100%',transform: '(-50%, -50%)', }}>
    <Image
      src="/images/eventos/Fliperama_locacao.webp"
      alt="Fliperama"
      width={900}
      height={500}
      style={{ borderRadius: '8px', objectFit: 'cover', width: '100%',transform: '(-50%, -50%)', }}
      
    />
  </div>
  <p style={{ padding:"10px",textAlign: 'center', color: '#438',
    fontWeight: 'bold', margin: '1%',borderRadius: '10px', }}>
   A CADA LOCAÇÃO GANHE CUPOM DE 5% de DESCONTO PARA SEU PRÓXIMO EVENTO!
  </p>
</section>

      {/* Fale Conosco Section */}
      <h2 style={{ backgroundColor:"#438",padding:"15px 0px",textAlign: 'center', 
        color: 'snow', maxWidth:"100%",
        fontWeight: 'bold',borderRadius: '10px', }}>
              FALE CONOSCO
        </h2>
<section
    id="orcamento" style={{ padding: '20px 10px', position: 'relative'  }}>
  
    <div style={{ textAlign: 'center',width:'100%', backgroundColor: 'rgba(0,0,0,9)' }}>
      <Image
      src="/images/bk/fale-conosco.webp"
      alt="Fliperama"
      width={900}
      height={500}
      style={{ borderRadius: '8px', objectFit: 'cover', width: '100%',transform: '(-50%, -50%)', }}
      />
    </div>
    {/* Acesse versões digitais dos nossos fliperamas e divirta-se onde estiver...... */}
    {/* </span> */}

    {/* Botão Jogue Centralizado */}

    <div style={{ position: 'absolute',bottom: '50%', left: '50%',width:'30%', transform: 'translateX(-50%)', 
 
 textAlign: 'center', zIndex: 10 }}>
  <a href="https://wa.me/5511975145360" target="_blank" style={{
    backgroundColor: '#25d366',fontSize:"1.5rem", fontWeight:'bold', padding:'2%',width:'100%',
    borderRadius: '5px', color: '#fff', display: 'inline-block',borderColor:"snow",
    boxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.9)', /* Adiciona sombra (opcional) */
  }}>
   Fale Pelo Whatsapp
  </a>
</div>


</section>

      {/* Eventos Section */}
      <h2 style={{ backgroundColor:"#438",padding:"10px 15px",textAlign: 'center',maxWidth:'100%', 
        color: 'snow', fontWeight: 'bold',borderRadius: '10px', }}>
        NOSSOS EVENTOS REALIZADOS
      </h2>
      <section  id="eventos"
        style={{
          backgroundColor:"#3224",
          // backgroundImage: "url('/images/bk/moldura-bkg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "100%",
          height: "100%",
          position: "relative",
          padding:'0px 10px'
        
        }}
        >
      
       
        {/* Adicionando o Componente EventSection */}
        <EventSection />
      </section>

       {/* Sobre Section */}
      <section
        id="sobre"
        style={{
          backgroundColor: "#fafafa",
          // backgroundImage: "url('/images/Fliperamas/arcade3.jpg')",
          marginTop:'20px',
          marginBottom:'110px',
          padding:'10px',
          width: "100%",
          height: "0 auto",
          position: "relative",

        }}
        >
      
        <h2 style={{ backgroundColor:"#438",padding:"10px 0px",textAlign: 'center',maxWidth:'100%', 
            color: 'snow', fontWeight: 'bold',borderRadius: '10px', }}
          >
             Conheça nossa História e paixão por Fliperamas Retrô...
        </h2>
        <p style={{color:'#000',marginBottom:'10px',padding:'10px'}}>
          A paixão por videogames começou nos anos dourados do Atari,Super Nintendo, Megadrive, Playstation..., quando cada partida era uma nova aventura. Hoje, com 54 anos, formado em Análise de Sistemas e atuando na área de Tecnologia da Informação com ênfase em redes de computadores e manutenção, trago essa paixão para um negócio que conecta nostalgia e tecnologia: o aluguel de fliperamas retrô.
         </p>
        <div  style={{
            backgroundImage: "url('/images/bk/videorama.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "450px",
            position: "relative",
          }}>
            
        </div>
          <p style={{color:'#000',padding:'10px'}}>
          Nossa missão é levar a experiência única dos fliperamas clássicos para eventos e momentos especiais, sempre garantindo que cada máquina esteja em perfeito estado. Com um profundo conhecimento técnico e décadas de experiência tanto em jogos quanto em tecnologia, cuidamos para que cada equipamento seja uma verdadeira peça de arte funcional.
          Seja para reviver memórias ou criar novas, estamos aqui para transformar o seu evento em uma viagem ao passado, com o charme e a diversão que só os fliperamas podem oferecer.
          Somos apaixonados pelo que fazemos, e desejamos que este conteudo tambem disperte em você esta paixão...
          <br /> Agradecidos: Equipe gegames
        </p>
      </section>
      
      <ButtonTop href="#top" text="Voltar ao Topo" />

        {/* Footer */}
      <Footer />
    </div>
    
  );
}
