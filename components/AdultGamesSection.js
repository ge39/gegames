import Head from 'next/head';
import Navbar from '../components/Navbar';
import '../styles/Globals.css';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { adultGames } from '../data/adultGames';

export default function Gamelist() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkPassword = () => {
    const today = new Date().getDate();
    const correctPassword = (today + 2).toString();
    const input = prompt('🔒 Digite a senha para acessar os jogos adultos:');
    if (input === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('❌ Senha incorreta!');
    }
  };

  useEffect(() => {
    checkPassword();
  }, []);

  const filteredGames = adultGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <>
        <Navbar />
        <main className="text-center py-10">
          <h2 className="text-2xl text-red-600 font-bold">
            <a className="text-xs text-blue-600 hover:underline" href="adult-games">Acessar 🔐</a>
          </h2>
          <p className="mt-2">Você não inseriu a senha correta.</p>
          {/* <button
            onClick={checkPassword}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar novamente
          </button> */}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Lista de Jogos Adultos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />
      <main>
        <section id="arcadeSection">
         
          
         {/* <Console /> */}

          {/* <div style={{ textAlign: 'center', margin: '20px' }}>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '80%',
                maxWidth: '500px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
            < WhatsappButton />
          </div>

          <div className={styles.gamesGrid}>
            {filteredGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <a href={`/emulation?jogo=${encodeURIComponent(game.path)}&core=${encodeURIComponent(game.core)}`}>
                  <h5>{game.name}</h5>
                  <Image
                    src={game.image}
                    alt={game.alt}
                    className={styles.gameImage}
                    width={200}
                    height={200}
                    priority
                  />
                  <h5>
                     {game.descricao}
                     {game.genre}  
                    {'Total Players: ' + game.players}
                  </h5>
                </a>
              </div>
            ))}
          </div> */}
        </section>
         
      </main>
       
      {/* <Footer /> */}
    </>
  );
}
