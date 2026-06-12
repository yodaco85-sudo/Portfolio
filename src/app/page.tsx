import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { PageShell } from "@/components/effects/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Projects />
      </main>
      <Footer />
    </PageShell>
  );
}
