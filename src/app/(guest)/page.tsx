import { HeroSection } from "@/components/home/HeroSection";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeHighlights />
      <TechStackSection />
      <FeaturedProjectsSection />
    </main>
  );
}