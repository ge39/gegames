const EventSection = () => {
  const months = [
    {
      name: "Novembro",
      events: [
        { 
          src: "https://drive.google.com/file/d/145rXeSoXNZspBkA5b9me5Ch66_6Zjbm_/preview", 
          description: "1º Torneio de Street Fighter 2024" 
        },
        { 
          src: "https://drive.google.com/file/d/1TQL6Oil09L9ZPqh98Viwti2GFnvQpnzj/preview", 
          description: "1º Torneio de Street Fighter 2024 - gegames" 
        },
        { 
          src: "https://drive.google.com/file/d/1i6K4hp09p88lu33D4YHAUxWtV0zhvl2T/preview", 
          description: "1º Torneio de Street Fighter 2024 - gegames" 
        },
        { 
          src: "https://drive.google.com/file/d/1BYzjyoIRQkBqN-pcMwvGRqcysScjioXN/preview", 
          description: "Video - gegames" 
        },
      ],
    },
    {
      name: "Dezembro",
      events: [
        { src: "https://drive.google.com/file/d/1s3iG2KcPUFbxEuTuGlWxOYXFl_R3Barj/preview", description: "Confraternizando casa do irmão Alex 2024" },
        { src: "https://drive.google.com/file/d/1MpxxWdL__UKx0u9kc7X7uwcksXY6ntd2/preview", description: "Confraternizando casa do irmão Alex 2024" },
        { src: "https://drive.google.com/file/d/1CSfdZqo9pUhRukE8mSN_tnPaEVbG2kdN/preview", description: "Confraternizando casa do irmão Alex 2024" },
        { src: "https://drive.google.com/file/d/1WxmgtF0QiNS7LHDRHjybR4CtrXL90ntI/preview", description: "Confraternizando casa do irmão Alex 2024" },
        { src: "https://drive.google.com/file/d/1kbhWhGcv_hKTIMwKsQ25x_wpSVSX2ZUm/preview", description: "Confraternizando casa do irmão Alex 2024" },
        { src: "https://drive.google.com/file/d/1-rd3Ugli48R0Rfe-bC7746qmt-YursK8/preview", description: "Confraternizando casa do irmão Alex 2024" },
      ],
    },
    
  ];

  const styles = {
    container: { padding: "20px" },
    title: { textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
    nav: { display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" },
    navLink: { margin: "0 10px", color: "snow", textDecoration: "none", fontWeight: "bold" },
    monthSection: { marginBottom: "30px" },
    monthTitle: { fontSize: "20px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" },
    eventContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" },
    eventCard: { backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" },
    video: { width: "100%", height: "250px", objectFit: "cover" },
    iframe: { width: "100%", height: "250px", border: "none" },
    text: { textAlign: "center", marginTop: "10px" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Eventos por Mês</h2>
      <nav style={styles.nav}>
        {months.map((month) => (
          <a key={month.name} href={`#${month.name}`} style={styles.navLink}>
            {month.name}
          </a>
        ))}
      </nav>
      {months.map((month) => (
        <section id={month.name} key={month.name} style={styles.monthSection}>
          <h3 style={styles.monthTitle}>{month.name}</h3>
          <div style={styles.eventContainer}>
            {month.events.map((event, index) => (
              <div key={index} style={styles.eventCard}>
                {event.src.includes("drive.google.com") ? (
                  <iframe
                    src={event.src}
                    style={styles.iframe}
                    allow="autoplay"
                  ></iframe>
                ) : (
                  <video style={styles.video} controls>
                    <source src={event.src} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                )}
                <p style={styles.text}>{event.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default EventSection;
