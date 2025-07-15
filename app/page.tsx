"use client";

import Landing from "@/components/Landing";
import Hero from "@/components/HeroMinimal";
import About from "@/components/About";
import Manifesto from "@/components/Manifesto";
import Projects from "@/components/Projects";
import ContactFinal from "@/components/ContactFinal";
import Navigation from "@/components/Navigation";
import LogoHeader from "@/components/LogoHeader";
import SkipToContent from "@/components/SkipToContent";

const Home = () => {
  return (
    <main className="relative min-h-screen">
      <SkipToContent />
      <LogoHeader />
      <Landing />
      <div className="fixed inset-0 bg-gradient-to-b from-[#F6F4F9] via-[#D9D7EC] to-[#F6F4F9] opacity-50 -z-10" />
      <Navigation />
      <div className="relative z-10" id="main-content">
        <div id="hero-section">
          <Hero />
        </div>
        <About />
        <Manifesto />
        <Projects />
        <ContactFinal />
      </div>
    </main>
  );
};

export default Home;