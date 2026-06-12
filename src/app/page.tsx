import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Profile } from "@/components/Profile";
import { ProjectStrip } from "@/components/ProjectStrip";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { PageShell } from "@/components/effects/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Nav />
      <main>
        <Hero />
        <ProjectStrip />
        <Marquee />
        <Projects />
        <Stack />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </PageShell>
  );
}
