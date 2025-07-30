import { useState } from 'react';
import GameFilter from '@/components/GameFilter';

export default function GameList() {
  const allGames = [/* lista de jogos com nome, console, players, etc */];
  const [filteredGames, setFilteredGames] = useState(allGames);

  const handleFilter = ({ search, consoleType, players }) => {
    let filtered = allGames;

    if (search) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (consoleType) {
      filtered = filtered.filter(game => game.console === consoleType);
    }

    if (players) {
      filtered = filtered.filter(game => game.players >= parseInt(players));
    }

    setFilteredGames(filtered);
  };

  return (
    <>
     <Head />
      <SEOHead
        title="Jogos Online Retrô | Gegames"
        description="Reviva os clássicos dos anos 80/90 no navegador. Jogue com webcam e desafie seus amigos!"
        url="https://gegames.vercel.app/jogos-online-retro"
        image="/logo/arcade.png"
      />
      <Navbar />
      
      <main className={styles.main}>
        <section id="arcadeSection">
         < Console />
         
          <div style={{ textAlign: 'center', margin: '20px' }}>
           
            <WhatsappButton />
          </div>

          <Carousel games={arcadeGames} />
        </section>

        <section id="snesSection">
            <Link href="/gamelistSnes">
              <h2>Super Nintendo</h2>
            </Link>
          <Carousel games={snesGames} />
        </section>

        <section id="atariSection">
          <Link href="/gamelistAtari">
            <h2>Atari</h2>
          </Link>
          <Carousel games={atariGames} />
        </section>

        <section id="megadriveSection">
          <Link href="/gamelistMegadrive">
            <h2>Megadrive</h2>
          </Link>
          <Carousel games={megadriveGames} />
          
        </section>
        
      </main>
      < Footer />
    </>
  );
}
