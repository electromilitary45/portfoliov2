import { HeroSection } from "@/components/home/HeroSection";
import { HomeHighlights } from "@/components/home/HomeHighlights";
import { TechStackSection } from "@/components/home/TechStackSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { LatestBlogPostsSection } from "@/components/home/LatestBlogPostsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeHighlights />
      <TechStackSection />
      <FeaturedProjectsSection />
      <LatestBlogPostsSection />
    </main>
  );
}