
// pages/adult-games.tsx
import AdultGamesSection from "../components/AdultGamesSection";
import SEOHead from "@/components/SEOHead";

export default function AdultGamesPage() {
  return (
    <>
        <SEOHead
        title="Jogos Adultos Arcade Online | GeGames 18+"
        description="Explore jogos retrô adultos em estilo arcade. Títulos raros e nostálgicos para maiores de 18 anos, jogáveis diretamente no navegador."
        keywords="jogos adultos, arcade adulto, retrô 18+, gegames adultos, jogos proibidos, fliperama 18+, nostálgicos"
        image="https://gegames.vercel.app/images/capa-adult.png"
        url="https://gegames.vercel.app/gamelistArcadeAdult"
      />
    </>
    <main className="min-h-screen bg-gray-100 py-10">
      <AdultGamesSection />
    </main>
  );
}
