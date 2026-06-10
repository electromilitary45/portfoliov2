import { HeroSection } from "@/components/home/HeroSection";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { TechStackSection } from "@/components/home/TechStackSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeHighlights />
      <TechStackSection />
    </main>
  );
}