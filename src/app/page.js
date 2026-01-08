import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewListings from "@/components/NewListings"; // Nouveautés
import OwnerCTA from "@/components/OwnerCTA"; // Prêt à vendre? (Red)
import Features from "@/components/Features"; // Pourquoi choisir?
import SeekerCTA from "@/components/SeekerCTA"; // À la recherche? (Teal)
import Guides from "@/components/Guides"; // Nos Guides
import Stats from "@/components/Stats"; // Stats
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <NewListings />
      <OwnerCTA />
      <Features />
      <SeekerCTA />
      <Guides />
      <Stats />
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </main>
  );
}
