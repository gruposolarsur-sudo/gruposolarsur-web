import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/sections/home/Contact";
import { Hero } from "@/sections/home/Hero";
import { Process } from "@/sections/home/Process";
import { Projects } from "@/sections/home/Projects";
import { SavingsBanner } from "@/sections/home/SavingsBanner";
import { Services } from "@/sections/home/Services";
import { Trust } from "@/sections/home/Trust";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Contact />
        <Services />
        <Trust />
        <Process />
        <Projects />
        <SavingsBanner />
      </main>
      <Footer />
    </>
  );
}
