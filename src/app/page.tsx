import { Navbar } from "@/components/navbar";
import { About, Contact, Footer, Hero, Projects, Stack } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
