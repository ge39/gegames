const EventSection = () => {
    // Lista de meses com os vídeos e descrições para cada mês
    const months = [
      {
        name: "Novembro",
        events: [
          { src: "/videos/novembro/video1.mp4", description: "1º Torneio de Street Fighter 2024" },
          { src: "/videos/novembro/video2.mp4", description: "1º Torneio de Street Fighter 2024 - gegames" },
          { src: "/videos/novembro/video3.mp4", description: "1º Torneio de Street Fighter 2024 - gegames" },
          { src: "/videos/novembro/video4.mp4", description: "video - gegames" },
        ]
      },
      {
        name: "Dezembro",
        events: [
          { src: "/videos/dezembro/video1.mp4", description: "Confraternizando casa do irmão Alex 2024" },
          { src: "/videos/dezembro/video2.mp4", description: "Confraternizando casa do irmão Alex 2024" },
          { src: "/videos/dezembro/video3.mp4", description: "Confraternizando casa do irmão Alex 2024" },
          { src: "/videos/dezembro/video4.mp4", description: "Confraternizando casa do irmão Alex 2024" },
          { src: "/videos/dezembro/video5.mp4", description: "Confraternizando casa do irmão Alex 2024" },
          { src: "/videos/dezembro/video6.mp4", description: "Confraternizando casa do irmão Alex 2024" },
        ]
      },
       // Adicione mais meses conforme necessário...
    ];
  
    const styles = {
      container: {
        padding: "20px",
      },
      title: {
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
      },
      nav: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "20px",
      },
      navLink: {
        margin: "0 10px",
        color: "#204080",
        textDecoration: "none",
        fontWeight: "bold",
      },
      monthSection: {
        marginBottom: "30px",
      },
      monthTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "10px",
      },
      eventContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
      },
      eventCard: {
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      video: {
        width: "100%",
        height: "350px",
        objectFit: "cover",
      },
      text: {
        textAlign: "center",
        marginTop: "10px",
      },
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
                  <video style={styles.video} controls>
                    <source src={event.src} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
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
  